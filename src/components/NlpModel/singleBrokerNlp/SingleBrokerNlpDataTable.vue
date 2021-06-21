<template>
  <div class="jTable" ref="spreadsheet"></div>
</template>

<script>
import jexcel from "jexcel";

import alphabetJson from "@/externaljs/Alphabet.json";
import cssHighLightRowHelper from "@/externaljs/cssHighLiteRow.js";
import { mapState } from "vuex";

export default {
  name: "SingelBrokerNlpDataTable",
  created() {},
  data() {
    return {
      alphabet: alphabetJson.alphabet,
      activeRow: 0,
    };
  },
  props: {
    apidata: { type: Array },
    headerData: { type: String },
  },
  computed: {
    ...mapState({
      window: (state) => state.window,
    }),
    tableHeaders() {
      return Object.keys(this.apidata[0]);
    },

    tableData() {
      let tdata = [];
      this.apidata.forEach((element) => {
        tdata.push(Object.values(element));
      });

      tdata.push([]);

      return tdata;
    },
    selectedRawText() {
      return this.jExcelObj.getValueFromCoords(
        this.tableHeaders.indexOf("RAW_TEXT"),
        this.activeRow
      );
    },
    config() {
      return {
        data: this.tableData,
        colHeaders: this.tableHeaders,
        tableOverflow: true,
        tableHeight: `${this.window.height}px`,
        tableWidth: `${this.window.width - 350}px`,
        columnSorting: false,
        colWidths: [90, 100, 70, 150, 100, 90, 150, 100, 70, 600],
        allowInsertRow: false,
        columns: this.setReadOnly(),
        contextMenu: function (obj, x, y, e) {},
        onselection: this.selectionActive,
        nestedHeaders: [
          [
            {
              title: this.headerData,
              colspan: this.tableHeaders.length,
            },
          ],
        ],
      };
    },
  },
  methods: {
    cellId(col, row) {
      return `${this.alphabet[col].toUpperCase()}${row}`;
    },
    setReadOnly() {
      var columns = [];

      for (var c = 0; c < this.tableHeaders.length - 1; c++) {
        columns.push({ readOnly: true, align: "center" });
      }

      columns.push({ readOnly: true, align: "left" });
      return columns;
    },
    selectionActive(instance, x1, y1, x2, y2, origin) {
      this.activeRow = y1;
      this.$emit("emit_selected_raw_text", this.selectedRawText);
      let cssUser = new cssHighLightRowHelper(this.jExcelObj, true, x1, y1);
      cssUser.activateUserEditableClasses();
    },
    FormatTable(data, table) {
      table.hideIndex();
      //reset font color to black after readonly class is added.
      for (var r = 1; r <= table.rows.length; r++) {
        for (var c = 0; c < table.headers.length; c++) {
          table.setStyle(this.cellId(c, r), "color", "black");
        }
      }

      const expCol = this.tableHeaders.indexOf("EXPIRY");

      for (var row = 1; row <= data.length; row++) {
        table.setStyle(this.cellId(expCol, row), "background-color", "#D2DEE9");
        table.setStyle(this.cellId(expCol, row), "font-weight", "bold");
        table.setStyle(this.cellId(expCol, row), "color", "#385F73");
      }
      for (var c = 0; c < table.headers.length; c++) {
        table.setStyle(
          this.cellId(c, table.rows.length),
          "background-color",
          "red"
        );
      }
    },
  },
  mounted() {
    const jExcelObj = jexcel(this.$refs.spreadsheet, this.config);
    this.FormatTable(this.apidata, jExcelObj);
    Object.assign(this, { jExcelObj });
  },
};
</script>

<style lang="scss">
</style>
