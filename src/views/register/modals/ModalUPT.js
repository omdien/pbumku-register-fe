import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";

import Card from "../../../components/Card";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Row, Col, Spinner } from "react-bootstrap";

const ModalUPT = ({ showUPT, handleCloseUPT }) => {
  const columns = [
    {
      name: "KODE UPT",
      cell: (row) => row["KD_UNIT"],
    },
    {
      name: "NAMA UPT",
      cell: (row) => row["NM_UNIT"],
    },
    {
      name: "ALAMAT",
      cell: (row) => row["ALAMAT_UNIT"],
    },
  ];

  const [upts, setUpts] = useState([]);
  // const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [query, setQuery] = useState("");

  const getUpts = async (page, size) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5001/register/upt?search_query=${keyword}&page=${page}&limit=${size}`
      );
      setUpts(response.data.result);
      // setPage(response.data.page);
      setPages(response.data.totalPages);
      setRows(response.data.totalRows);
    } catch (error) {
      console.log(error);
      setUpts([]);
    }
  };

  useEffect(() => {
    getUpts();
  }, []);

  const handleChangePage = (page) => {
    getUpts(page - 1, size);
  };

  const handlePerRowsChange = async (size, page) => {
    const response = await axios.get(
      `http://localhost:5001/register/upt?search_query=${keyword}&page=${page}&limit=${size}`
    );
    setUpts(response.data.result);
    // setPage(response.data.page);
    setPages(response.data.totalPages);
    setRows(response.data.totalRows);
    setSize(size);
    // setLimit(limit)
  };

  // const searchData = (e) => {
  //   e.preventDefault();
  //   // page = 0;
  //   setKeyword(query)
  // };

  // console.log(rowData)

  const [showConfirmLaporan, setShowConfirmLaporan] = useState(false);
  // const handleCloseConfirmLaporan = () => setShowConfirmLaporan(false);
  const [showFileEmpty, setShowFileEmpty] = useState(false);
  const handleCloseShowFileEmpty = () => setShowFileEmpty(false);
  const [showLaporanSuccess, setShowLaporanSuccess] = useState(false);
  const [showLaporanFailed, setShowLaporanFailed] = useState(false);
  // const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const PilihUPT = () => {
    if (fileContent !== "") {
      setShowConfirmLaporan(true);
    } else {
      setShowFileEmpty(true);
    }
  };

  const handleBatal = () => {
    handleCloseUPT();
    // setTotalHasil("");
    // setTotalSesuai("");
    // setTotalMinor("");
    // setTotalMayor("");
    // setTotalKritis("");
    // setFileContent("");
    // setFileName("");
    // setKeterangan("");
  };

  // const changePage = ({ selected }) => {
  //   setPage(selected);
  //   // getUpts();
  // };

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
                    <h4 className="card-title">
                      Daftar Unit Pelaksana Teknis (UPT) BPPMHKP
                    </h4>
                  </div>
                  <div>
                    {/* <form className="d-flex" onSubmit={searchData}>
                      <input
                        className="form-control me-2"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        value={query}
                        onChange={(e)=>setQuery(e.target.value)}
                      />
                      <button className="btn btn-outline-dark" type="submit">
                        Search
                      </button>
                    </form> */}
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="table-responsive border-bottom my-3">
                    {/* {loading && <Spinner />} */}
                    <DataTable
                      customStyles={{
                        headCells: {
                          style: {
                            "background-color": "#00acee",
                            color: "white",
                          },
                        },
                      }}
                      columns={columns}
                      data={upts}
                      highlightOnHover
                      pagination
                      paginationServer
                      paginationTotalRows={rows}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handlePerRowsChange}
                    />
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
