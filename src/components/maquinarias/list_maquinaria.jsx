import React from "react";

const List_Maquinaria = ({ datos }) => {
  return (
    <>
      <div className="card">
        <div className="card-header card-header-content-md-between">
          <div className="mb-2 mb-md-0">
            <form>
              <div className="input-group input-group-merge input-group-flush">
                <div className="input-group-prepend input-group-text">
                  <i className="bi-search"></i>
                </div>
                <input
                  id="datatableSearch"
                  type="search"
                  className="form-control"
                  placeholder="Search users"
                  aria-label="Search users"
                />
              </div>
            </form>
          </div>

          <div className="d-grid d-sm-flex gap-2">
            <button
              className="btn btn-white"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasEcommerceProductFilter"
              aria-controls="offcanvasEcommerceProductFilter"
            >
              <i className="bi-filter me-1"></i> Filters
            </button>

            <div className="dropdown">
              <button
                type="button"
                className="btn btn-white w-100"
                id="showHideDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="outside"
              >
                <i className="bi-table me-1"></i> Columns{" "}
                <span className="badge bg-soft-dark text-dark rounded-circle ms-1">
                  6
                </span>
              </button>

              <div
                className="dropdown-menu dropdown-menu-end dropdown-card"
                aria-labelledby="showHideDropdown"
              >
                <div className="card card-sm">
                  <div className="card-body">
                    <div className="d-grid gap-3">
                      <label
                        className="row form-check form-switch"
                        htmlFor="toggleColumn_product"
                      >
                        <span className="col-8 col-sm-9 ms-0">
                          <span className="me-2">Product</span>
                        </span>
                        <span className="col-4 col-sm-3 text-end">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="toggleColumn_product"
                            checked=""
                          />
                        </span>
                      </label>

                      <label
                        className="row form-check form-switch"
                        htmlFor="toggleColumn_type"
                      >
                        <span className="col-8 col-sm-9 ms-0">
                          <span className="me-2">Type</span>
                        </span>
                        <span className="col-4 col-sm-3 text-end">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="toggleColumn_type"
                            checked=""
                          />
                        </span>
                      </label>

                      <label
                        className="row form-check form-switch"
                        htmlFor="toggleColumn_vendor"
                      >
                        <span className="col-8 col-sm-9 ms-0">
                          <span className="me-2">Vendor</span>
                        </span>
                        <span className="col-4 col-sm-3 text-end">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="toggleColumn_vendor"
                          />
                        </span>
                      </label>

                      <label
                        className="row form-check form-switch"
                        htmlFor="toggleColumn_stocks"
                      >
                        <span className="col-8 col-sm-9 ms-0">
                          <span className="me-2">Stocks</span>
                        </span>
                        <span className="col-4 col-sm-3 text-end">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="toggleColumn_stocks"
                            checked=""
                          />
                        </span>
                      </label>
                      <label
                        className="row form-check form-switch"
                        htmlFor="toggleColumn_sku"
                      >
                        <span className="col-8 col-sm-9 ms-0">
                          <span className="me-2">SKU</span>
                        </span>
                        <span className="col-4 col-sm-3 text-end">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="toggleColumn_sku"
                            checked=""
                          />
                        </span>
                      </label>
                      <label
                        className="row form-check form-switch"
                        htmlFor="toggleColumn_price"
                      >
                        <span className="col-8 col-sm-9 ms-0">
                          <span className="me-2">Price</span>
                        </span>
                        <span className="col-4 col-sm-3 text-end">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="toggleColumn_price"
                            checked=""
                          />
                        </span>
                      </label>
                      <label
                        className="row form-check form-switch"
                        htmlFor="toggleColumn_quantity"
                      >
                        <span className="col-8 col-sm-9 ms-0">
                          <span className="me-2">Quantity</span>
                        </span>
                        <span className="col-4 col-sm-3 text-end">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="toggleColumn_quantity"
                          />
                        </span>
                      </label>
                      <label
                        className="row form-check form-switch"
                        htmlFor="toggleColumn_variants"
                      >
                        <span className="col-8 col-sm-9 ms-0">
                          <span className="me-2">Variants</span>
                        </span>
                        <span className="col-4 col-sm-3 text-end">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="toggleColumn_variants"
                            checked=""
                          />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive datatable-custom">
          <div id="datatable_wrapper" className="dataTables_wrapper no-footer">
            <div className="dataTables_length" id="datatable_length">
              <label>
                Show{" "}
                <select
                  name="datatable_length"
                  aria-controls="datatable"
                  className=""
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>{" "}
                entries
              </label>
            </div>
            <div id="datatable_filter" className="dataTables_filter">
              <label>
                Search:
                <input
                  type="search"
                  className=""
                  placeholder=""
                  aria-controls="datatable"
                />
              </label>
            </div>
            <table
              id="datatable"
              className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table dataTable no-footer"
              data-hs-datatables-options='{
               "columnDefs": [{
                  "targets": [0, 4, 9],
                  "width": "5%",
                  "orderable": false
                }],
               "order": [],
               "info": {
                 "totalQty": "#datatableWithPaginationInfoTotalQty"
               },
               "search": "#datatableSearch",
               "entries": "#datatableEntries",
               "pageLength": 12,
               "isResponsive": false,
               "isShowPaging": false,
               "pagination": "datatablePagination"
             }'
              role="grid"
              aria-describedby="datatable_info"
            >
              <thead className="thead-light">
                <tr role="row">
                  <th
                    scope="col"
                    className="table-column-pe-0 sorting_disabled"
                    rowspan="1"
                    colspan="1"
                    aria-label="
              
                
                
                
              
            "
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="datatableCheckAll"
                      />
                      <label className="form-check-label"></label>
                    </div>
                  </th>
                  <th
                    className="table-column-ps-0 sorting"
                    tabindex="0"
                    aria-controls="datatable"
                    rowspan="1"
                    colspan="1"
                    aria-label="Product: activate to sort column ascending"
                  >
                    Product
                  </th>
                  <th
                    className="sorting"
                    tabindex="0"
                    aria-controls="datatable"
                    rowspan="1"
                    colspan="1"
                    aria-label="Type: activate to sort column ascending"
                  >
                    Type
                  </th>
                  <th
                    className="sorting_disabled"
                    rowspan="1"
                    colspan="1"
                    aria-label="Stocks"
                  >
                    Stocks
                  </th>
                  <th
                    className="sorting"
                    tabindex="0"
                    aria-controls="datatable"
                    rowspan="1"
                    colspan="1"
                    aria-label="SKU: activate to sort column ascending"
                  >
                    SKU
                  </th>
                  <th
                    className="sorting"
                    tabindex="0"
                    aria-controls="datatable"
                    rowspan="1"
                    colspan="1"
                    aria-label="Price: activate to sort column ascending"
                  >
                    Price
                  </th>
                  <th
                    className="sorting"
                    tabindex="0"
                    aria-controls="datatable"
                    rowspan="1"
                    colspan="1"
                    aria-label="Variants: activate to sort column ascending"
                  >
                    Variants
                  </th>
                  <th
                    className="sorting_disabled"
                    rowspan="1"
                    colspan="1"
                    aria-label="Actions"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr role="row" className="even">
                  <td className="table-column-pe-0">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="productsCheck12"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="productsCheck12"
                      ></label>
                    </div>
                  </td>
                  <td className="table-column-ps-0">
                    <a
                      className="d-flex align-items-center"
                      href="./ecommerce-product-details.html"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="avatar avatar-lg"
                          src="./assets/img/400x400/img17.jpg"
                          alt="Image Description"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="text-inherit mb-0">Gray and yellow cap</h5>
                      </div>
                    </a>
                  </td>
                  <td>Accessories</td>

                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="stocksCheckbox12"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="stocksCheckbox12"
                      ></label>
                    </div>
                  </td>
                  <td>8311741241</td>
                  <td>$9</td>

                  <td>1</td>
                  <td>
                    <div className="btn-group" role="group">
                      <a
                        className="btn btn-white btn-sm"
                        href="./ecommerce-product-details.html"
                      >
                        <i className="bi-pencil-fill me-1"></i> Edit
                      </a>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-white btn-icon btn-sm dropdown-toggle dropdown-toggle-empty"
                          id="productsEditDropdown12"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></button>

                        <div
                          className="dropdown-menu dropdown-end-end mt-1"
                          aria-labelledby="productsEditDropdown12"
                        >
                          <a className="dropdown-item" href="#">
                            <i className="bi-trash dropdown-item-icon"></i> Delete
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="bi-archive dropdown-item-icon"></i>{" "}
                            Archive
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="bi-upload dropdown-item-icon"></i> Publish
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="bi-x-lg dropdown-item-icon"></i> Unpublish
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="dataTables_info"
              id="datatable_info"
              role="status"
              aria-live="polite"
            >
              Showing 1 to 12 of 20 entries
            </div>
          </div>
        </div>
      </div>
      <p>Status: {datos.status}</p>
      <pre>{JSON.stringify(datos.data || datos.error, null, 2)}</pre>
    </>
  );
};

export default List_Maquinaria;
