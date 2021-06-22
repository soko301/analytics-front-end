import Api from "./Api";

export default {
  refresh_data() {
    return Api.get(`/refresh`);
  },
  get_accounts() {
    return Api.get(`/accounts`);
  },
  get_data_by_cross(cross) {
    return Api.get(`/client_data/${cross}`);
  },
  get_data_by_cross_and_account(cross, account) {
    return Api.get(`/client_data/${cross}/${account}`);
  },
  get_data_van_exo(cross, account) {
    return Api.get(`/van_exo/${cross}/${account}`);
  },
  get_data_by_account(account) {
    return Api.get(`/single_account_data/${account}`);
  },
  get_summary(account) {
    return Api.get(`/summary/${account}`);
  },
  get_deal_details(booking_ref) {
    return Api.get(`/deal_details/${booking_ref}`);
  },
  get_cross_count_by_account() {
    return Api.get(`/cross_by_account`);
  },
  get_account_by_cross() {
    return Api.get(`/account_by_cross`);
  },
  get_open_positions(cross, account) {
    return Api.get(`/open_positions_by_cross_account/${cross}/${account}`);
  },
  get_histogram_trade_time(account) {
    return Api.get(`/time_histogram/${account}`);
  },
  get_delta_position_all_cross(account) {
    return Api.get(`/delta_all_cross/${account}`);
  },
  search_van_deals_by_dets(cross, maturity_date, strike) {
    return Api.get(`/search_van_deals_by_dets/${cross}/${maturity_date}/${strike}`);
  },
};
