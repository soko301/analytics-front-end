<template>
  <div class="jTable" ref="spreadsheet"></div>
</template>

<script>
import jexcel from "jexcel";

import alphabetJson from "@/externaljs/Alphabet.json";
import columnFormat from "@/components/clientData/clientAnalytics/columnFormat.json";
import cssHighLightRowHelper from "@/externaljs/cssHighLiteRow.js";
import { mapState } from "vuex";

export default {
  name: "client_datatable",
  created() {},
  data() {
    return {
      alphabet: alphabetJson.alphabet,
      columnFormat: columnFormat.columns,
      activeRow: 0,
    };
  },
  props: {
    apidata: { type: Array },
    headerData: { type: String },
    colwidths: { type: Array },
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

      return tdata;
    },
    booking_ref() {
      return this.jExcelObj.getValueFromCoords(
        this.tableHeaders.indexOf("Booking Ref"),
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
        colWidths: this.colwidths,
        allowInsertRow: false,
        freezeColumns: 1,
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
        if (this.columnFormat.includes(this.tableHeaders[c])) {
          columns.push({
            readOnly: true,
            align: "center",
            type: "text",
            mask: "[-] #.##,00",
          });
        } else {
          columns.push({
            readOnly: true,
            align: "center",
          });
        }
      }

      return columns;
    },

    selectionActive(instance, x1, y1, x2, y2, origin) {
      this.activeRow = y1;
      this.$emit("emit_booking_ref", this.booking_ref);
      let cssUser = new cssHighLightRowHelper(this.jExcelObj, true, x1, y1);
      cssUser.activateUserEditableClasses();
    },
    FormatTable(data, table) {
      table.hideIndex();
      //reset font color to black after readonly class is added.
      for (var r = 1; r < table.rows.length + 1; r++) {
        for (var c = 0; c < table.headers.length; c++) {
          let cell_id = this.cellId(c, r);
          let val = table.getValue(cell_id);

          let font_color = val < 0 ? "red" : "black ";

          table.setStyle(cell_id, "color", font_color);
        }
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
