import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Col, Form, OverlayTrigger, Row, Spinner, Tooltip } from "react-bootstrap";
import { FaPen, FaFileUpload, FaCogs, FaEye, FaDownload, FaAddressBook, FaBookOpen, FaCheck } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6"
import PbUmkuService from "../../../services/pbumku/PbumkuService";
import Card from "../../../components/Card";
import DataTable from "react-data-table-component";
import Propinsi from "../../../utilities/Propinsi";
import KotaKab from "../../../utilities/KotaKab";
import ModalSpt from "./modals/ModalSpt";
import ModalLaporan from "./modals/ModalLaporan";
import ModalLampTeknis from "./modals/ModalLampTeknis";
import ModalViewSpt from "./modals/ModalViewSpt";
import ModalViewLaporan from "./modals/ModalViewLaporan";
import MasterService from "../../../services/master/MasterService";
import { AsyncPaginate } from "react-select-async-paginate";
import ModalViewLampTeknis from "./modals/ModalViewLampTeknis";

const DaftarPrimer = () => {
    const columns = [
        {
            name: 'Permohonan',
            cell: row => (
                <>
                    <div className="row">
                        <div className="col-12">
                            <b>Nomor Permohonan :</b>
                        </div>
                        <div className="col-12">
                            {row['idIzin']}
                        </div>
                        <div className="col-12">
                            <b>Tanggal Permohonan :</b>
                        </div>
                        <div className="col-12">
                            {row['tglPermohonan']}
                        </div>
                    </div>
                </>
            )
        },
        {
            name: 'Perusahaan',
            cell: row => (
                <>
                    <div className="row">
                        <div className="col-12">
                            <b>NIB :</b>
                        </div>
                        <div className="col-12">
                            {row['nib']}
                        </div>
                        <div className="col-12">
                            <b>Nama Perusahaan :</b>
                        </div>
                        <div className="col-12">
                            {row['namaPerseroan']}
                        </div>
                    </div>
                </>
            ),
            grow: 0.75
        },
        {
            name: 'Nama Izin',
            cell: row => (<>{row['namaIzin']} ({row['urIzinSingkat']})</>),
            grow: 0.75
        },
        {
            name: 'No Kegiatan Usaha',
            cell: row => row['nomorProyek'],
        },
        {
            name: 'Usaha',
            cell: row => row['uraianUsaha'],
            grow: 0.75
        },
        {
            name: 'Propinsi',
            cell: row => <Propinsi id={row['kdProp']} />,
            grow: 0.5
        },
        {
            name: 'Kota/Kab',
            cell: row => <KotaKab id={row['kdKota']} />,
            grow: 0.5
        },
        {
            name: 'Status Izin',
            cell: row => row['statusChecklist'] === '00' ? 'MENUNGGU VERIFIKASI PERSYARATAN' : row['statusChecklist'] === '45' ? 'PERSYARATAN TELAH DIVERIFIKASI' : row['statusChecklist'] === '50' ? 'PERSETUJUAN PERIZINAN' : row['statusChecklist'] === '99' ? 'BELUM MELENGKAPI PERSYARATAN' : '',
            grow: 0.75
        },
        {
            name: 'Keterangan',
            cell: row => (
                <>
                    <div className="row">
                        {row['idSpt'] === null ?
                            <>
                                <div className="row">
                                    <label className="col-sm-12 col-form-label-sm"><FaSquareXmark color="red" />{' '}SPT</label>
                                </div>
                            </>
                            :
                            <>
                                <div className="row">
                                    <label className="col-sm-12 col-form-label-sm"><FaCheck color="green" />{' '}SPT</label>
                                </div>
                            </>
                        }
                        {row['idLapHdr'] === null ?
                            <>
                                <div className="row">
                                    <label className="col-sm-12 col-form-label-sm"><FaSquareXmark color="red" />{' '}Upload Checklist</label>
                                </div>
                            </>
                            :
                            <>
                                <div className="row">
                                    <label className="col-sm-12 col-form-label-sm"><FaCheck color="green" />{' '}Upload Checklist</label>
                                </div>
                            </>
                        }
                        {(row['idLapHdr'] !== null && row['statusLap'] === '000') &&
                            <>
                                <div className="row">
                                    <label className="col-sm-12 col-form-label-sm"><FaSquareXmark color="red" />{' '}Menunggu Persetujuan Checklist</label>
                                </div>
                            </>
                        }
                        {(row['idLapHdr'] !== null && row['statusLap'] === '100') &&
                            <>
                                <div className="row">
                                    <label className="col-sm-12 col-form-label-sm"><FaCheck color="green" />{' '}Persetujuan Checklist</label>
                                </div>
                            </>
                        }
                        {row['idLapLampiran'] === null ?
                            <>
                                <div className="row">
                                    <label className="col-sm-12 col-form-label-sm"><FaSquareXmark color="red" />{' '}Lampiran Teknis</label>
                                </div>
                            </>
                            :
                            <>
                                <div className="row">
                                    <label className="col-sm-12 col-form-label-sm"><FaCheck color="green" />{' '}Lampiran Teknis</label>
                                </div>
                            </>
                        }
                    </div>
                </>
            )
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <div className="row">
                        {
                            row['idSpt'] === null && (localStorage.getItem('role') === '1' || localStorage.getItem('role') === '6') &&
                            <>
                                <div className="col-md-12 mb-3 mt-2">
                                    <OverlayTrigger placement="bottom" overlay={
                                        <Tooltip >Buat SPT</Tooltip>
                                    }>
                                        <Button size="sm" variant="warning" onClick={() => handleClickCreateSpt(row)}>
                                            <FaPen />{' '} Buat SPT
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </>
                        }
                        {
                            row['idSpt'] !== null &&
                            <>
                                <div className="col-md-12 mb-3 mt-2">
                                    <OverlayTrigger placement="bottom" overlay={
                                        <Tooltip >Lihat SPT</Tooltip>
                                    }>
                                        <Button size="sm" variant="info" onClick={() => handleClickViewSpt(row)}>
                                            <FaEye />{' '} Lihat SPT
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                                {
                                    row['idLapHdr'] === null &&
                                    <div className="col-md-12 mb-3">
                                        <OverlayTrigger placement="bottom" overlay={
                                            <Tooltip >Upload Laporan Checklist</Tooltip>
                                        }>
                                            <Button size="sm" variant="primary" onClick={() => handleClickAddLaporan(row)}>
                                                <FaFileUpload />{' '} Upload Laporan
                                            </Button>
                                        </OverlayTrigger>
                                    </div>
                                }
                                {
                                    row['idLapHdr'] !== null &&
                                    <div className="col-md-12 mb-3">
                                        <OverlayTrigger placement="bottom" overlay={
                                            <Tooltip >Lihat Laporan Checklist</Tooltip>
                                        }>
                                            <Button size="sm" variant="success" onClick={() => handleClickViewLaporan(row)}>
                                                <FaAddressBook />{' '} Lihat Laporan
                                            </Button>
                                        </OverlayTrigger>
                                    </div>
                                }
                                {
                                    (localStorage.getItem("role") === '6' || localStorage.getItem("role") === '1') && row['idLapLampiran'] === null && row['idLapHdr'] !== null && row['statusLap'] !== '000' &&
                                    <div className="col-md-12 mb-3">
                                        <OverlayTrigger placement="bottom" overlay={
                                            <Tooltip >Buat Lampiran Teknis</Tooltip>
                                        }>
                                            <Button size="sm" variant="danger" onClick={() => handleClickAddLamp(row)}>
                                                <FaBookOpen />{' '} Buat Lampiran Teknis
                                            </Button>
                                        </OverlayTrigger>
                                    </div>
                                }
                                {
                                    row['idLapLampiran'] !== null &&
                                    <div className="col-md-12 mb-3">
                                        <OverlayTrigger placement="bottom" overlay={
                                            <Tooltip >Lihat Lampiran Teknis</Tooltip>
                                        }>
                                            <Button size="sm" variant="secondary" onClick={() => handleClickViewLampiran(row)}>
                                                <FaDownload />{' '} Lihat Lampiran Teknis
                                            </Button>
                                        </OverlayTrigger>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </>
            )
        }
    ]

    let pbUmkuService = useMemo(() => new PbUmkuService(), [])
    let masterService = useMemo(() => new MasterService(), [])
    const [listOssHeader, setListOssHeader] = useState([])
    const [size, setSize] = useState(10)
    const [totalData, setTotalData] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingSync, setLoadingSync] = useState(false)
    const [showAlertSucces, setShowAlertSuccess] = useState(false)
    const [searchNib, setSearchNib] = useState('')
    const [rowData, setRowData] = useState(null)
    const [laporanFile, setLaporanFile] = useState(null)
    const [lampiranTeknis, setLampiranTeknis] = useState(null)
    const [dataProyek, setDataProyek] = useState(null)
    const [dataProyekLokasi, setDataProyekLokasi] = useState([])
    const [dataOssHeader, setDataOssHeader] = useState(null)

    const [valuePropOpt, setValuePropOpt] = useState(null)
    const [valueKdProp, setValueKdProp] = useState(null)

    const [showAddSpt, setShowAddSpt] = useState(false)
    const handleCloseAddSpt = () => setShowAddSpt(false)

    const [showViewSpt, setShowViewSpt] = useState(false)
    const handleCloseViewSpt = () => setShowViewSpt(false)

    const [showAddLaporan, setShowAddLaporan] = useState(false)
    const handleCloseAddLaporan = () => setShowAddLaporan(false)

    const [showViewLaporan, setShowViewLaporan] = useState(false)
    const handleCloseViewLaporan = () => setShowViewLaporan(false)

    const [showAddLamp, setShowAddLamp] = useState(false)
    const handleCloseAddLamp = () => setShowAddLamp(false)

    const [showViewLampiran, setShowViewLampiran] = useState(false)
    const handleCloseViewLampiran = () => setShowViewLampiran(false)

    const handleClickCreateSpt = (rowdata) => {
        // console.log(rowdata)
        setRowData(rowdata)
        setShowAddSpt(true)
    }

    const handleClickViewSpt = (rowdata) => {
        setRowData(rowdata)
        setShowViewSpt(true)
    }

    const handleClickAddLaporan = (rowdata) => {
        setRowData(rowdata)
        setShowAddLaporan(true)
    }

    const handleClickViewLaporan = (rowdata) => {
        setRowData(rowdata)
        getResLaporan(rowdata.idLapHdr)
        setShowViewLaporan(true)
    }

    const handleClickAddLamp = (rowdata) => {
        setRowData(rowdata)
        setShowAddLamp(true)
    }

    const handleClickViewLampiran = (rowdata) => {
        setRowData(rowdata)
        getResLaporan(rowdata.idLapHdr)
        getResLampiran(rowdata.idLapHdr)
        getDataOssHeader(rowdata.idoss)
        getDataProyek(rowdata.idpryk)
        setShowViewLampiran(true)
    }


    const getResLaporan = async (idLapHdr) => {
        try {
            setLaporanFile(null)
            const _resListFile = await pbUmkuService.listLaporanFile(idLapHdr, 0, 10)
            let listFile = _resListFile.data.data;
            const _resFile = await pbUmkuService.findLaporanFileById(listFile[0].idlapfile)
            // console.log(_resFile.data)
            setLaporanFile(_resFile.data)
        } catch (error) {
            setLaporanFile(null)
        }
    }

    const getResLampiran = async (idLapHdr) => {
        try {
            setLampiranTeknis(null)
            const _resListLampiran = await pbUmkuService.listLaporanLampiran(idLapHdr, 0, 10)
            let listLampiran = _resListLampiran.data.data 
            const _resLampiranData = await pbUmkuService.findLaporanLampiranById(listLampiran[0].idlaplampiran)
            setLampiranTeknis(_resLampiranData.data)
        } catch (error) {
            setLampiranTeknis(null)
        }
    }

    const getDataOssHeader = async (idoss) => {
        try {
            setDataOssHeader(null)
            const _resDataOssHeader = await pbUmkuService.getOssHeader(idoss)
            setDataOssHeader(_resDataOssHeader.data)            
        } catch (error) {
            console.log(error)
            setDataOssHeader(null)
        }
    }

    const getDataProyek = async (idPryk) => {
        try {
            setDataProyek(null)
            const _resDataProyek = await pbUmkuService.findOssProyekById(idPryk)
            setDataProyek(_resDataProyek.data)
            // console.log(_resDataProyek.data)
            let idProyek = _resDataProyek.data.idProyek
            const _listProyekLokasi = await pbUmkuService.listOssProyekLokasi(idProyek)
            // console.log(_listProyekLokasi.data)
            setDataProyekLokasi(_listProyekLokasi.data)
        } catch (error) {
            console.log(error)
            setDataProyek(null)
        }
    }

    const getListOssHeader = useCallback(async (page, size) => {
        setLoading(true)
        try {
            let response;
            if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "6") {
                response = await pbUmkuService.ossHeaderList(null, null, null, page, size)
            } else {
                response = await pbUmkuService.ossHeaderList(null, localStorage.getItem("kdUnit"), null, page, size)
            }
            // console.log(response.data.data)
            setListOssHeader(response.data.data)
            setTotalData(response.data.totalData)
        } catch (error) {
            // console.log(error)
            setListOssHeader([])
        }
        setLoading(false)
    }, [pbUmkuService])

    const getListOssHeaderByFilter = async (searchNib, kdProp, page, size) => {
        setLoading(true)
        try {
            let response;
            if (searchNib !== '') {
                if (kdProp === null) {
                    if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "6") {
                        response = await pbUmkuService.ossHeaderList(searchNib, null, null, page, size)
                    } else {
                        response = await pbUmkuService.ossHeaderList(searchNib, localStorage.getItem("kdUnit"), null, page, size)
                    }
                } else {
                    if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "6") {
                        response = await pbUmkuService.ossHeaderList(searchNib, null, kdProp, page, size)
                    } else {
                        response = await pbUmkuService.ossHeaderList(searchNib, localStorage.getItem("kdUnit"), kdProp, page, size)
                    }
                }
            } else {
                if (kdProp === null) {
                    if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "6") {
                        response = await pbUmkuService.ossHeaderList(null, null, null, page, size)
                    } else {
                        response = await pbUmkuService.ossHeaderList(null, localStorage.getItem("kdUnit"), null, page, size)
                    }
                } else {
                    if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "6") {
                        response = await pbUmkuService.ossHeaderList(null, null, kdProp, page, size)
                    } else {
                        response = await pbUmkuService.ossHeaderList(null, localStorage.getItem("kdUnit"), kdProp, page, size)
                    }
                }
            }
            // console.log(response.data.data)
            setListOssHeader(response.data.data)
            setTotalData(response.data.totalData)
        } catch (error) {
            // console.log(error)
            setListOssHeader([])
        }
        setLoading(false)
    }

    useEffect(() => {
        getListOssHeader(0, 10)
    }, [getListOssHeader])

    const handleChangePage = (page) => {
        if (searchNib !== '' || valueKdProp !== null) {
            getListOssHeaderByFilter(searchNib, valueKdProp, page - 1, size)
        } else {
            getListOssHeader(page - 1, size)
        }
    }

    const handlePerRowsChange = async (size, page) => {
        let response;
        if (searchNib !== '') {
            if (valueKdProp !== null) {
                if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "6") {
                    response = await pbUmkuService.ossHeaderList(searchNib, null, valueKdProp, page - 1, size)
                } else {
                    response = await pbUmkuService.ossHeaderList(searchNib, localStorage.getItem("kdUnit"), valueKdProp, page - 1, size)
                }
            } else {
                if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "6") {
                    response = await pbUmkuService.ossHeaderList(searchNib, null, null, page - 1, size)
                } else {
                    response = await pbUmkuService.ossHeaderList(searchNib, localStorage.getItem("kdUnit"), null, page - 1, size)
                }
            }
        } else {
            if (valueKdProp !== null) {
                if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "6") {
                    response = await pbUmkuService.ossHeaderList(null, null, valueKdProp, page - 1, size)
                } else {
                    response = await pbUmkuService.ossHeaderList(null, localStorage.getItem("kdUnit"), valueKdProp, page - 1, size)
                }
            } else {
                if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "6") {
                    response = await pbUmkuService.ossHeaderList(null, null, null, page - 1, size)
                } else {
                    response = await pbUmkuService.ossHeaderList(null, localStorage.getItem("kdUnit"), null, page - 1, size)
                }
            }
        }

        setListOssHeader(response.data.data)
        setSize(size)
    }

    const onChangeSearchByNib = (e) => {
        setSearchNib(e.target.value)
    }

    const handleClickSearch = async () => {
        getListOssHeaderByFilter(searchNib, valueKdProp, 0, 10)
    }

    const handleResetFilter = () => {
        setSearchNib('')
        setValueKdProp(null)
        setValuePropOpt(null)
        getListOssHeader(0, 10)
    }

    const handleClickSync = async () => {
        setLoadingSync(true)
        try {
            const response = await pbUmkuService.syncNibFromOss(searchNib)
            setShowAlertSuccess(true)
        } catch (error) {
            setShowAlertSuccess(true)
        }
        setLoadingSync(false)
    }

    async function loadPropinsi(search, loadedOption, { page }) {
        const response = await masterService.listPropinsi(search, page, 10)
        // console.log(response.data.data)
        return {
            options: response.data.data,
            hasMore: response.data.data.length >= 10,
            additional: {
                page: search ? 2 : page + 1
            }
        }
    }

    const onChangeProp = e => {
        setValuePropOpt(e)
        setValueKdProp(e.kodePropinsi)
    }


    return (
        <>
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">Pencarian Data PB-UMKU</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Form>
                                        <Form.Group as={Row} className="form-group">
                                            <Form.Label column sm="2" className="control-label align-self-center mb-0" htmlFor="searchNib">NIB</Form.Label>
                                            <Col sm="2">
                                                <Form.Control type="searchNib" placeholder="Nomor NIB" className="form-control-sm" onChange={onChangeSearchByNib} value={searchNib} />
                                            </Col>
                                            <Col sm="6">
                                                <Button type="button" variant="btn btn-info" size="sm" onClick={() => handleClickSync()}><FaCogs />Sync with OSS</Button>{' '}
                                                {loadingSync && <Spinner />}
                                            </Col>
                                            <Col sm="3">
                                                {
                                                    <Alert variant="success alert-left alert-dismissible fade show mb-3" role="alert" show={showAlertSucces} onClose={() => setShowAlertSuccess(false)} >
                                                        <span> Sinkronisasi Data OSS NIB {searchNib} berhasil</span>
                                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlertSuccess(false)}></button>
                                                    </Alert>
                                                }
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Form>
                                        <Form.Group as={Row} className="form-group">
                                            <Form.Label column sm="2" className="control-label align-self-center mb-0" htmlFor="searchNib">Propinsi</Form.Label>
                                            <Col sm="4">
                                                <AsyncPaginate
                                                    loadOptions={loadPropinsi}
                                                    value={valuePropOpt}
                                                    getOptionValue={(option) => option.kodePropinsi}
                                                    getOptionLabel={(option) => option.kodePropinsi + ' - ' + option.uraianPropinsi}
                                                    additional={{
                                                        page: 0,
                                                    }}
                                                    onChange={onChangeProp}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Form>
                                        <Form.Group as={Row} className="form-group">
                                            <Col sm="2">
                                                <Button type="button" variant="btn btn-primary" size="sm" onClick={() => handleClickSearch()}>Cari</Button>{' '}
                                                <Button type="button" variant="btn btn-danger" size="sm" onClick={() => handleResetFilter()}>Reset</Button>{' '}
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">Daftar Permohonan PB-UMKU</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive border-bottom my-3">
                                {(loading && <Spinner />)}
                                <DataTable
                                    customStyles={{ headCells: { style: { 'background-color': '#00acee', 'color': 'white' } } }}
                                    columns={columns}
                                    data={listOssHeader}
                                    highlightOnHover
                                    pagination
                                    paginationServer
                                    paginationTotalRows={totalData}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handlePerRowsChange}
                                    persistTableHead={true}
                                    expandableRows
                                    expandableRowsComponent={(data) => <ExpandableComponent data={data} reloadList={getListOssHeader} />}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ModalSpt showAddSpt={showAddSpt} handleCloseAddSpt={handleCloseAddSpt} rowData={rowData} reloadList={getListOssHeader} />
            <ModalViewSpt showViewSpt={showViewSpt} handleCloseViewSpt={handleCloseViewSpt} rowData={rowData} />
            <ModalLaporan showAddLaporan={showAddLaporan} handleCloseAddLaporan={handleCloseAddLaporan} rowData={rowData} reloadList={getListOssHeader} />
            <ModalViewLaporan showViewLaporan={showViewLaporan} handleCloseViewLaporan={handleCloseViewLaporan} rowData={rowData} laporanFile={laporanFile} reloadList={getListOssHeader} />
            <ModalLampTeknis showAddLamp={showAddLamp} handleCloseAddLamp={handleCloseAddLamp} rowData={rowData} reloadList={getListOssHeader} />
            <ModalViewLampTeknis showViewLampiran={showViewLampiran} handleCloseViewLampiran={handleCloseViewLampiran} rowData={rowData} laporanFile={laporanFile} lampiranTeknis={lampiranTeknis} dataOssHeader={dataOssHeader} dataProyek={dataProyek} dataProyekLokasi={dataProyekLokasi} reloadList={getListOssHeader}/>
        </>
    )
}

const ExpandableComponent = ({ data, reloadList }) => {
    let pbUmkuService = useMemo(() => new PbUmkuService(), [])
    const [dataOssProyek, setDataOssProyek] = useState({})
    const [dataOssChecklist, setDataOssChecklist] = useState({})
    const [dataOss, setDataOss] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getOssProyekById = async () => {
            setLoading(true)
            try {
                const resOss = await pbUmkuService.getDataOssById(data.data.idoss)
                setDataOss(resOss.data)
                const resOssProyek = await pbUmkuService.findOssProyekById(data.data.idpryk)
                setDataOssProyek(resOssProyek.data)
                const resOssChecklist = await pbUmkuService.findOssChecklistById(data.data.idchecklist)
                setDataOssChecklist(resOssChecklist.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        getOssProyekById()
    }, [pbUmkuService, data])

    return (
        <>
            {loading && <Spinner />}
        </>
    )
}

export default DaftarPrimer