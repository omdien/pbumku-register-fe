import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../../components/Card";
import axios from "axios";
import DataTable from "react-data-table-component";

const ModalUPT = ({ showUPT, handleCloseUPT}) => {
  const [upts, setUpts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);    
  const [rows, setRows] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getUpts();
  }, []);

  const getUpts = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/register/upt?search_query=${keyword}&page=${page}&limit=${limit}`);
      setUpts(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPages);
      setRows(response.data.totalRows);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(rowData)

  const [showConfirmLaporan, setShowConfirmLaporan] = useState(false);
  const handleCloseConfirmLaporan = () => setShowConfirmLaporan(false);
  const [showFileEmpty, setShowFileEmpty] = useState(false);
  const handleCloseShowFileEmpty = () => setShowFileEmpty(false);
  const [showLaporanSuccess, setShowLaporanSuccess] = useState(false);
  const [showLaporanFailed, setShowLaporanFailed] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const [totalSesuai, setTotalSesuai] = useState("");
  const [totalMinor, setTotalMinor] = useState("");
  const [totalMayor, setTotalMayor] = useState("");
  const [totalKritis, setTotalKritis] = useState("");
  const [totalHasil, setTotalHasil] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const PilihUPT = () => {
    if (fileContent !== "") {
      setShowConfirmLaporan(true);
    } else {
      setShowFileEmpty(true);
    }
  };

  const handleBatal = () => {
    handleCloseUPT();
    setTotalHasil("");
    setTotalSesuai("");
    setTotalMinor("");
    setTotalMayor("");
    setTotalKritis("");
    setFileContent("");
    setFileName("");
    setKeterangan("");
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    // getUpts();
  };

  return (
    <>
      <Modal
        show={showUPT}
        onHide={handleCloseUPT}
        backdrop="static"
        keyboard={false}
        scrollable={true}
        size="xl"
        centered
      >
        {/* <Modal.Header>
          <h6>Unit Pelaksana Teknis BPPMHKP</h6>
        </Modal.Header> */}
        <Modal.Body>
          <Row>
            <Col sm="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Unit Pelaksana Teknis (UPT) BPPMHKP</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  {/* <p>
                    Images in Bootstrap are made responsive with{" "}
                    <code>.img-fluid</code>. <code>max-width: 100%;</code> and{" "}
                    <code>height: auto;</code> are applied to the image so that
                    it scales with the parent element.
                  </p> */}
                  <div className="table-responsive border-bottom my-3">
                    <Table
                      responsive
                      striped
                      id="datatable"
                      className=""
                      data-toggle="data-table"
                    >
                      <thead>
                        <tr>
                          <th>Kode UPT</th>
                          <th>Nama UPT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upts.map((upt) => (
                          <tr key={upt.KD_UNIT}>
                            <td>{upt.KD_UNIT}</td>
                            <td>{upt.NM_UNIT}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Kode UPT</th>
                          <th>Nama UPT</th>
                        </tr>
                      </tfoot>
                    </Table>
                    <Row className="align-items-center">
                      <Col md="6">
                        <div
                          className="dataTables_info"
                          id="datatable_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing { rows ? page + 1 : 0 } to {pages} of {rows} entries
                        </div>
                      </Col>
                      <Col md="6">
                        <div
                          className="pagination justify-content-end mb-0"
                          id="datatable_paginate"
                        >
                          <ReactPaginate
                            previousLabel={"< Prev"}
                            nextLabel={"Next >"}
                            pageCount={pages}
                            onPageChange={changePage}
                            containerClassName="pagination-list"
                          />
                          {/* <ul className="pagination">
                            <li
                              className="paginate_button page-item previous disabled"
                              id="datatable_previous"
                            >
                              <Link
                                to="#"
                                aria-controls="datatable"
                                aria-disabled="true"
                                data-dt-idx="previous"
                                tabIndex="0"
                                className="page-link"
                              >
                                Previous
                              </Link>
                            </li>
                            <li className="paginate_button page-item active">
                              <Link
                                to="#"
                                aria-controls="datatable"
                                aria-current="page"
                                data-dt-idx="0"
                                tabIndex="0"
                                className="page-link"
                              >
                                1
                              </Link>
                            </li>
                            <li className="paginate_button page-item ">
                              <Link
                                to="#"
                                aria-controls="datatable"
                                data-dt-idx="1"
                                tabIndex="0"
                                className="page-link"
                              >
                                2
                              </Link>
                            </li>
                            <li className="paginate_button page-item ">
                              <Link
                                to="#"
                                aria-controls="datatable"
                                data-dt-idx="2"
                                tabIndex="0"
                                className="page-link"
                              >
                                3
                              </Link>
                            </li>
                            <li className="paginate_button page-item ">
                              <Link
                                to="#"
                                aria-controls="datatable"
                                data-dt-idx="3"
                                tabIndex="0"
                                className="page-link"
                              >
                                4
                              </Link>
                            </li>
                            <li className="paginate_button page-item ">
                              <Link
                                to="#"
                                aria-controls="datatable"
                                data-dt-idx="4"
                                tabIndex="0"
                                className="page-link"
                              >
                                5
                              </Link>
                            </li>
                            <li className="paginate_button page-item ">
                              <Link
                                to="#"
                                aria-controls="datatable"
                                data-dt-idx="5"
                                tabIndex="0"
                                className="page-link"
                              >
                                6
                              </Link>
                            </li>
                            <li
                              className="paginate_button page-item next"
                              id="datatable_next"
                            >
                              <Link
                                to="#"
                                aria-controls="datatable"
                                data-dt-idx="next"
                                tabIndex="0"
                                className="page-link"
                              >
                                Next
                              </Link>
                            </li>
                          </ul> */}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* <div className="row mb-3">
                        <label className="col-sm-4 col-form-label-sm">Perizinan</label>
                        <div className="col-sm-8">
                            <input type="text" className="col-sm-12 form-control-sm" name="nib" defaultValue={rowData !== null && rowData.urIzin} disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label-sm">NIB / Nama Perusahaan</label>
                        <div className="col-sm-8">
                            <input type="text" className="col-sm-12 form-control-sm" name="nib" defaultValue={rowData !== null && (rowData.nib + ' / ' + rowData.namaPerseroan)} disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label-sm">Nomor / Tanggal Permohonan</label>
                        <div className="col-sm-8">
                            <input type="text" className="col-sm-12 form-control-sm" name="idIzin" defaultValue={rowData !== null && rowData.idIzin + ' / ' + rowData.tglPermohonan} disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label-sm">Nomor Kegiatan Usaha</label>
                        <div className="col-sm-8">
                            <input type="text" className="col-sm-12 form-control-sm" name="nomor_proyek" defaultValue={rowData !== null && rowData.nomorProyek} disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label-sm">Usaha</label>
                        <div className="col-sm-8">
                            <input type="text" className="col-sm-12 form-control-sm" name="nib" defaultValue={rowData !== null && rowData.uraianUsaha} disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label-sm">Nomor / Tanggal SPT</label>
                        <div className="col-sm-8">
                            <input type="text" className="col-sm-12 form-control-sm" name="nib" defaultValue={rowData !== null && rowData.nomorSpt + ' / ' + rowData.tanggalSpt} disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label-sm">Upload Checklist (file extension .xlsx | max 2 Mb)</label>
                        <div className="col">
                            <input type="file" className="form-control-sm" name="upload_file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                placeholder="Upload File Excel Checklist"
                                onChange={e => handleUploadFile(e)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label-sm"><strong>Total Ketidaksesuaian</strong></label>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-1 col-form-label-sm">Sesuai</label>
                        <div className="col-sm-2">
                            <input type="text" className="col-sm-12 form-control-sm" name="sesuai" defaultValue={totalSesuai} disabled />
                        </div>
                        <label className="col-sm-1 col-form-label-sm">Minor</label>
                        <div className="col-sm-2">
                            <input type="text" className="col-sm-12 form-control-sm" name="minor" defaultValue={totalMinor} disabled />
                        </div>
                        <label className="col-sm-1 col-form-label-sm">Mayor</label>
                        <div className="col-sm-2">
                            <input type="text" className="col-sm-12 form-control-sm" name="mayor" defaultValue={totalMayor} disabled />
                        </div>
                        <label className="col-sm-1 col-form-label-sm">Kritis</label>
                        <div className="col-sm-2">
                            <input type="text" className="col-sm-12 form-control-sm" name="kritis" defaultValue={totalKritis} disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label-sm"><strong>Hasil / Nilai Kuantitaif</strong></label>
                        <div className="col-sm-3">
                            <input type="text" className="col-sm-12 form-control-sm" name="hasil" defaultValue={totalHasil} disabled />
                        </div>
                        <label className="col-sm-1 col-form-label-sm">Keterangan</label>
                        <div className="col-sm-3">
                            <input type="text" className="col-sm-12 form-control-sm" name="keterangan" defaultValue={keterangan} disabled />
                        </div>
                    </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" size="sm" onClick={() => PilihUPT()}>
            Pilih
          </Button>{" "}
          <Button variant="danger" size="sm" onClick={() => handleBatal()}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
      {showConfirmLaporan && (
        <SweetAlert
          title="Simpan Laporan Checklist?"
          warning
          showCancel
          confirmBtnText="Proses"
          confirmBtnBsStyle="primary"
          cancelBtnText="Batal"
          cancelBtnBsStyle="secondary"
          // onConfirm={handleClickUPT}
          // onCancel={handleCloseConfirmUPT}
          focusCancelBtn
          reverseButtons={true}
          btnSize="sm"
        />
      )}
      {showLaporanSuccess && (
        <SweetAlert
          title="Laporan Berhasil Disimpan"
          success
          // onConfirm={handleClickLaporanSuccess}
          btnSize="sm"
        />
      )}
      {showLaporanFailed && (
        <SweetAlert
          title="Laporan Gagal Disimpan"
          danger
          // onConfirm={handleClickLaporanFailed}
          btnSize="sm"
          timeout={2000}
        />
      )}
      {showFileEmpty && (
        <SweetAlert
          title="FIle Harus Diupload"
          danger
          onConfirm={handleCloseShowFileEmpty}
          btnSize="sm"
        />
      )}
    </>
  );
};

export default ModalUPT;
