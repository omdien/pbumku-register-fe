import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

import Card from "../../components/Card";
import MasterService from "../../services/master/MasterService";
import DataTable from "react-data-table-component";

const MasterIkan = () => {
    const columns = [
        {
            name: 'ID IKAN',
            cell: row => row['idIkan']
        },
        {
            name: 'Nama Dagang',
            cell: row => row['nmDagang']
        },
        {
            name: 'Nama Umum',
            cell: row => row['nmUmum']
        },
        {
            name: 'Nama Latin',
            cell: row => row['nmLatin']
        },
        {
            name: 'HS Code',
            cell: row => row['hscode']
        }
    ]

    let masterService = useMemo(() => new MasterService(), [])

    const [listMasterIkan, setListMasterIkan] = useState([])
    const [size, setSize] = useState(10)
    const [totalData, setTotalData] = useState(0)
    const [loading, setLoading] = useState(false)

    const getlistMasterIkan = useCallback(async (page, size) => {
        setLoading(true)
        try {
            const response = await masterService.listMasterIkan(null, null, null, page, size)
            setListMasterIkan(response.data.data)
            setTotalData(response.data.totalData)
        } catch (error) {
            console.log(error)
            setListMasterIkan([])
        }
        setLoading(false)
    }, [masterService])

    useEffect(() => {
        getlistMasterIkan(0, 10)
    }, [getlistMasterIkan])

    const handleChangePage = (page) => {
        getlistMasterIkan(page - 1, size)
    }

    const handlePerRowsChange = async (size, page) => {
        const _res = await masterService.listMasterIkan(null, null, null, page - 1, size)
        setListMasterIkan(_res.data.data)
        setSize(size)
    }


    return (
        <>
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">Daftar Master Ikan</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive border-bottom my-3">
                                {(loading && <Spinner />)}
                                <DataTable
                                    customStyles={{ headCells: { style: { 'background-color': '#00acee', 'color': 'white' } } }}
                                    columns={columns}
                                    data={listMasterIkan}
                                    highlightOnHover
                                    pagination
                                    paginationServer
                                    paginationTotalRows={totalData}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handlePerRowsChange}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default MasterIkan;
