import React, { useState } from "react";
import { Row, Col, Image, Form, Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../../src/components/Card.js";

const Register = () => {
  // perusahaan
  const [JENIS_USAHA, setJENIS_USAHA] = useState("");
  const [NOMOR_KUSUKA, setNOMOR_KUSUKA] = useState("");
  const [NAMA, setNAMA] = useState("");
  const [NPWP, setNPWP] = useState("");
  const [NO_IZIN, setNO_IZIN] = useState("");
  const [ALAMAT, setALAMAT] = useState("");
  const [PROPINSI, setPROPINSI] = useState("");
  const [KOTA, setKOTA] = useState("");
  const [KODEPOS, setKODEPOS] = useState("");
  const [TELEPON, setTELEPON] = useState("");
  const [EMAIL, setEMAIL] = useState("");
  const [EMAIL_PNBP, setEMAIL_PNBP] = useState("");
  const [KETERANGAN, setKETERANGAN] = useState("");
  const [TGL_DAFTAR, setTGL_DAFTAR] = useState("2024/12/17");
  const [FILE_ID, setFILE_ID] = useState("");
  const [STATUS, setSTATUS] = useState("");
  const [LAST_UPDATED, setLAST_UPDATED] = useState("2024/12/17");
  const navigate = useNavigate();
  // user
  const [user, setUser] = useState({
    ROLE: "8",
    KODE_TRADER: 2205,
    USERNAME: "",
    PASSWORD: "",
    JNS_ID: "1",
    NO_ID: "",
    NAMA: "",
    ALAMAT: "",
    EMAIL: "",
    TELEPON: "",
    JABATAN: "",
    KD_UNIT: "1",
    STATUS: "1",
    STS_LOGIN: "0",
    DATE_LOGIN: "2024/12/17",
    IP_LOGIN: "",
    LAST_LOGIN: "2024/12/17",
    DATE_CREATED: "2024/12/17",
    USER_CREATED: 1,
    LAST_UPDATED: "2024/12/17",
    USER_UPDATED: 1,
  });

  const saveTrader = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/register", {
        JENIS_USAHA,
        NOMOR_KUSUKA,
        NAMA,
        NPWP,
        NO_IZIN,
        ALAMAT,
        PROPINSI,
        KOTA,
        KODEPOS,
        TELEPON,
        EMAIL,
        EMAIL_PNBP,
        KETERANGAN,
        TGL_DAFTAR,
        FILE_ID,
        STATUS,
        LAST_UPDATED,
      });
      await axios.post("http://localhost:5001/user", user);
         // user.ROLE,
         // user.KODE_TRADER,
         // user.USERNAME, 
         // user.PASSWORD, 
         // user.JNS_ID,   
         // user.NO_ID,          
         // user.NAMA,
         // user.ALAMAT, 
         // user.EMAIL, 
         // user.TELEPON, 
         // user.JABATAN, 
         // user.KD_UNIT, 
         // user.STATUS, 
         // user.STS_LOGIN, 
         // user.DATE_LOGIN, 
         // user.IP_LOGIN, 
         // user.LAST_LOGIN, 
         // user.DATE_CREATED, 
         // user.USER_CREATED, 
         // user.LAST_UPDATED, 
         // user.USER_UPDATED,
      //   user: {
      //     ROLE: user.ROLE,
      //     KODE_TRADER: user.KODE_TRADER,
      //     USERNAME: user.USERNAME,
      //     PASSWORD: user.PASSWORD,
      //     JNS_ID: user.JNS_ID,
      //     NO_ID: user.NO_ID,
      //     NAMA: user.NAMA,
      //     ALAMAT: user.ALAMAT,
      //     EMAIL: user.EMAIL,
      //     TELEPON: user.TELEPON,
      //     JABATAN: user.JABATAN,
      //     KD_UNIT: user.KD_UNIT,
      //     STATUS: user.STATUS,
      //     STS_LOGIN: user.STS_LOGIN,
      //     DATE_LOGIN: user.DATE_LOGIN,
      //     IP_LOGIN: user.IP_LOGIN,
      //     LAST_LOGIN: user.LAST_LOGIN,
      //     DATE_CREATED: user.DATE_CREATED,
      //     USER_CREATED: user.USER_CREATED,
      //     LAST_UPDATED: user.LAST_UPDATED,
      //     USER_UPDATED: user.USER_UPDATED,
      //   },
        //     ROLE,},
        //   uKODE_TRADER,
        //   uUSERNAME,
        //   uPASSWORD,
        //   uJNS_ID,
        //   uNO_ID,
        //   uNAMA,
        //   uALAMAT,
        //   uEMAIL,
        //   uTELEPON,
        //   uJABATAN,
        //   uKD_UNIT,
        //   uSTATUS,
        //   uSTS_LOGIN,
        //   uDATE_LOGIN,
        //   uIP_LOGIN,
        //   uLAST_LOGIN,
        //   uDATE_CREATED,
        //   uUSER_CREATED,
        //   uLAST_UPDATED,
        //   uUSER_UPDATED,
      // });
      // navigate("/registrasi");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col md="12">
            <Row className="justify-content-center">
              <Col md="10">
                <Card className="card-transparent shadow-sm d-flex justify-content-center mb-0 auth-card mt-5 border">
                  <Card.Body>
                    <h2 className="mb-3 text-center">Form Registrasi</h2>
                    <h4 className="mb-5 text-center">
                      Data Umum Pengguna Jasa
                    </h4>
                    <Form onSubmit={saveTrader}>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label  align-self-center mb-0"
                          htmlFor="jenis"
                        >
                          Jenis Usaha*
                        </Form.Label>
                        <Col sm="9">
                          <select
                            className="form-select mb-3 shadow-none"
                            value={JENIS_USAHA}
                            onChange={(e) => setJENIS_USAHA(e.target.value)}
                          >
                            <option defaultValue>Pilih Jenis Usaha</option>
                            <option value="1">Ekspor</option>
                            <option value="2">Impor</option>
                          </select>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0"
                          htmlFor="nmperusahaan"
                        >
                          Nama Perusahaan*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="Text"
                            placeholder="Nama Perusahaan"
                            value={NAMA}
                            onChange={(e) => setNAMA(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 text-dark"
                          htmlFor="npwp"
                        >
                          NPWP Perusahaan*
                        </Form.Label>
                        <Col sm="9">
                          <Row>
                            <Col>
                              <Form.Control
                                type="text"
                                placeholder="NPWP 15 Digit"
                                value={NPWP}
                                onChange={(e) => setNPWP(e.target.value)}
                              />
                            </Col>
                            <Col>
                              <Form.Control
                                type="text"
                                placeholder="NPWP 16 Digit"
                              />
                            </Col>
                            <Col>
                              <Form.Control type="file" id="customFile" />
                            </Col>
                          </Row>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0"
                          htmlFor="nmpemilik"
                        >
                          Nama Pemilik
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="Text"
                            placeholder="Nama Pemilik"
                            value={user.NAMA}
                            onChange={(e) =>
                              setUser({ ...user, NAMA: e.target.value })
                            }
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0"
                          htmlFor="jabatan"
                        >
                          Jabatan*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="Text"
                            placeholder="Jabatan"
                            value={user.JABATAN}
                            onChange={(e) =>
                              setUser({ ...user, JABATAN: e.target.value })
                            }
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0"
                          htmlFor="noidentitas"
                        >
                          No. Identitas KTP/KITAS*
                        </Form.Label>
                        <Col sm="9">
                          <Row>
                            <Col>
                              <select
                                className="form-select mb-3 shadow-none"
                                value={user.JNS_ID}
                                onChange={(e) =>
                                  setUser({ ...user, JNS_ID: e.target.value })
                                }
                              >
                                <option defaultValue>Pilih Identitas</option>
                                <option value="1">KTP</option>
                                <option value="2">SIM</option>
                                <option value="3">Kartu Keluarga</option>
                              </select>
                            </Col>
                            <Col>
                              <Form.Control
                                type="text"
                                placeholder="Nomor Identitas"
                                value={user.NO_ID}
                                onChange={(e) =>
                                  setUser({ ...user, NO_ID: e.target.value })
                                }
                              />
                            </Col>
                            <Col>
                              <Form.Control type="file" id="idFile" />
                            </Col>
                          </Row>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 text-dark"
                          htmlFor="email"
                        >
                          Ijin Usaha Perikanan (NIB)
                        </Form.Label>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 ps-5"
                          htmlFor="nomor"
                        >
                          Nomor*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="Text"
                            placeholder="Nomor izin usaha"
                            value={NO_IZIN}
                            onChange={(e) => setNO_IZIN(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 ps-5"
                          htmlFor="penerbit"
                        >
                          Instansi Penerbit*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="Text"
                            placeholder="Nama Instansi Penerbit"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 ps-5"
                          htmlFor="tgl_terbit"
                        >
                          Tanggal Penerbitan*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="date"
                            id="exampleInputdate"
                            defaultValue="2019-12-18"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0"
                          htmlFor="file_izin"
                        ></Form.Label>
                        <Col sm="9">
                          <Form.Control type="file" id="idFileIzin" />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 text-dark"
                          htmlFor="addr_pengguna"
                        >
                          Alamat Pengguna Jasa
                        </Form.Label>
                      </Form.Group>

                      {/* Alamat Rumah */}
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 text-dark"
                          htmlFor="addr_rumah"
                        >
                          Alamat Rumah
                        </Form.Label>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-top mb-0 ps-5"
                          htmlFor="penerbit"
                        >
                          Jalan / No / Rt / Rw
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            as="textarea"
                            id="exampleFormControlTextarea1"
                            rows="5"
                            placeholder="Alamat Rumah"
                            value={user.ALAMAT}
                            onChange={(e) =>
                              setUser({ ...user, ALAMAT: e.target.value })
                            }
                          />
                        </Col>
                      </Form.Group>
                      {/* <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 ps-5"
                          htmlFor="propinsi"
                        >
                          Propinsi*
                        </Form.Label>
                        <Col sm="9">
                          <select className="form-select mb-3 shadow-none">
                            <option defaultValue>Pilih Propinsi</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label  align-self-center mb-0 ps-5"
                          htmlFor="kab_kota"
                        >
                          Kabupaten/Kota*
                        </Form.Label>
                        <Col sm="9">
                          <select className="form-select mb-3 shadow-none">
                            <option defaultValue>Pilih Kabupaten/Kota</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label  align-self-center mb-0 ps-5"
                          htmlFor="kel_kec"
                        >
                          Kel/Kec*
                        </Form.Label>
                        <Col sm="9">
                          <select className="form-select mb-3 shadow-none">
                            <option defaultValue>Pilih Kecamatan</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 ps-5"
                          htmlFor="kd_pos"
                        >
                          Kode Pos*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control type="Text" placeholder="Kode Pos" />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 ps-5"
                          htmlFor="telp"
                        >
                          Telepon/Faksimili
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="Text"
                            placeholder="Telepon Rumah"
                          />
                        </Col>
                      </Form.Group> */}
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 text-dark ps-5"
                          htmlFor="email"
                        >
                          Pos Elektronik/Email*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="Text"
                            placeholder="Email Rumah"
                            value={user.EMAIL}
                            onChange={(e) =>
                              setUser({ ...user, EMAIL: e.target.value })
                            }
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 ps-5"
                          htmlFor="hand_rumah"
                        >
                          Nomor Handphone*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="Text"
                            placeholder="Nomor Handphone"
                            value={user.TELEPON}
                            onChange={(e) =>
                              setUser({ ...user, TELEPON: e.target.value })
                            }
                          />
                        </Col>
                      </Form.Group>

                      {/* Alamat Kantor */}
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 text-dark"
                          htmlFor="addr_rumah"
                        >
                          Alamat Kantor
                        </Form.Label>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-top mb-0  ps-5"
                          htmlFor="addr_kantor"
                        >
                          Jalan / No / Rt / Rw
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            as="textarea"
                            id="exampleFormControlTextarea1"
                            rows="5"
                            placeholder="Alamat Kantor"
                            value={ALAMAT}
                            onChange={(e) => setALAMAT(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0  ps-5"
                          htmlFor="propinsi_kantor"
                        >
                          Propinsi*
                        </Form.Label>
                        <Col sm="9">
                          <select className="form-select mb-3 shadow-none">
                            <option defaultValue>Pilih Propinsi</option>
                            <option value="11">ACEH</option>
                            <option value="51">BALI</option>
                            <option value="36">BANTEN</option>
                          </select>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label  align-self-center mb-0  ps-5"
                          htmlFor="kab_kota_kantor"
                        >
                          Kabupaten / Kota*
                        </Form.Label>
                        <Col sm="9">
                          <select className="form-select mb-3 shadow-none">
                            <option defaultValue>Pilih Kabupaten/Kota</option>
                            <option value="1101">KAB. SIMEULUE</option>
                            <option value="1102">KAB. ACEH SINGKIL</option>
                            <option value="1103">KAB. ACEH SELATAN</option>
                          </select>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label  align-self-center mb-0 ps-5"
                          htmlFor="kel_kec_kantor"
                        >
                          Kel / Kec*
                        </Form.Label>
                        <Col sm="9">
                          <select className="form-select mb-3 shadow-none">
                            <option defaultValue>Pilih Kecamatan</option>
                            <option value="1101010">TEUPAH SELATAN</option>
                            <option value="1101020">SIMEULUE TIMUR</option>
                            <option value="1101021">TEUPAH BARAT</option>
                          </select>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 ps-5"
                          htmlFor="kd_pos_kantor"
                        >
                          Kode Pos*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="Text"
                            placeholder="Kode Pos"
                            value={KODEPOS}
                            onChange={(e) => setKODEPOS(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 ps-5"
                          htmlFor="telp_kantor"
                        >
                          Telepon / Faksimili
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="Text"
                            placeholder="Telepon Kantor"
                            value={TELEPON}
                            onChange={(e) => setTELEPON(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 text-dark  ps-5"
                          htmlFor="email_kantor"
                        >
                          Pos Elektronik / Email*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="Text"
                            placeholder="Email Kantor"
                            value={EMAIL}
                            onChange={(e) => setEMAIL(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-top mb-0  ps-5"
                          htmlFor="ket_kantor"
                        >
                          Keterangan
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            as="textarea"
                            id="exampleFormControlTextarea1"
                            rows="5"
                            placeholder="Keterangan"
                            value={KETERANGAN}
                            onChange={(e) => setKETERANGAN(e.target.value)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 text-dark"
                          htmlFor="addr_pengguna"
                        >
                          Unit Pelaksana Teknis
                        </Form.Label>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 text-dark ps-5"
                          htmlFor="email_kantor"
                        >
                          UPT*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control type="Text" placeholder="UPT" />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 text-dark"
                          htmlFor="addr_pengguna"
                        >
                          Data Userlogin
                        </Form.Label>
                      </Form.Group>
                      <Form.Group as={Row} className="form-group">
                        <Form.Label
                          column
                          sm="3"
                          className="control-label align-self-center mb-0 text-dark ps-5"
                          htmlFor="email_kantor"
                        >
                          User ID*
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control type="Text" placeholder="User Id" />
                        </Col>
                      </Form.Group>
                      <div className="text-center mt-5">
                        <Button type="submit" variant="btn btn-primary">
                          Submit
                        </Button>{" "}
                        <Button type="button" variant="btn btn-danger">
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="sign-bg">
              <svg
                width="280"
                height="230"
                viewBox="0 0 431 398"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.05">
                  <rect
                    x="-157.085"
                    y="193.773"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 -157.085 193.773)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="7.46875"
                    y="358.327"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 7.46875 358.327)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="61.9355"
                    y="138.545"
                    width="310.286"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 61.9355 138.545)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="62.3154"
                    y="-190.173"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 62.3154 -190.173)"
                    fill="#3B8AFF"
                  />
                </g>
              </svg>
            </div>
          </Col>
          {/* <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                  <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images" />
               </Col> */}
        </Row>
      </section>
    </>
  );
};

export default Register;
