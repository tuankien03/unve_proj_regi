import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import { format, parseISO } from 'date-fns';

function createData(
  registrationDate,
  centerCode,
  centerName,
  carPlate,
  ownerId,
  carCompany,
  carName,
  pickUpDate,
  carVIN,
  carEN,
  purpose
) {
  return {
    registrationDate,
    centerCode,
    centerName,
    carPlate,
    ownerId,
    carDetails: [
      {
        carCompany: carCompany,
        carName: carName,
        pickUpDate: pickUpDate,
        carVIN: carVIN,
        carEN: carEN,
        purpose: purpose,
      },
    ],
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  ml: 18,
  mr: 18,
  mt: 2,
};

function ModalEdit() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton aria-label="edit" size="medium" onClick={handleOpen}>
        <EditIcon fontSize="inherit" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Chỉnh sửa đơn đăng kiểm</b>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Stack spacing={2}>
              <TableCell>
                <b>Thông tin đăng kiểm</b>
              </TableCell>
              <TextField
                id="filled-basic"
                label="CMND/CCCD chủ xe"
                variant="filled"
              />
              <TextField
                id="filled-basic"
                label="Biển số xe đăng kiểm"
                variant="filled"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Ngày đăng kiểm" />
              </LocalizationProvider>
            </Stack>
            <Stack spacing={2}>
              <TableCell>
                <b>Thông tin xe</b>
              </TableCell>
              <TextField id="filled-basic" label="Hãng xe" variant="filled" />
              <TextField id="filled-basic" label="Tên xe" variant="filled" />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Ngày cấp xe" />
              </LocalizationProvider>
              <TextField id="filled-basic" label="Số khung" variant="filled" />
              <TextField id="filled-basic" label="Số máy" variant="filled" />
              <TextField
                id="filled-basic"
                label="Mục đích sử dụng"
                variant="filled"
              />
            </Stack>
            <Stack spacing={2}>
              <TableCell>
                <b>Thông tin chủ</b>
              </TableCell>
              <TextField id="filled-basic" label="Họ" variant="filled" />
              <TextField id="filled-basic" label="Tên" variant="filled" />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Ngày sinh" />
              </LocalizationProvider>
              <TextField id="filled-basic" label="SĐT" variant="filled" />
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Tỉnh
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Hà Nội"}>Hà Nội</MenuItem>
                  <MenuItem value={"Thanh Hóa"}>Thanh Hóa</MenuItem>
                  <MenuItem value={"Bắc Ninh"}>Bắc Ninh</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Quận/Huyện
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  disabled
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Nam Từ Liêm"}>Nam Từ Liêm</MenuItem>
                  <MenuItem value={"Hoằng Hóa"}>Hoằng Hóa</MenuItem>
                  <MenuItem value={"Bắc Linh"}>Bắc Linh</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Xã/Phường
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  disabled
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Mỹ Đình 1"}>Mỹ Đình 1</MenuItem>
                  <MenuItem value={"Hoằng Hóa"}>Hoằng Hóa</MenuItem>
                  <MenuItem value={"Nắc Linh"}>Nắc Linh</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="filled-basic"
                label="Địa chỉ cụ thể"
                variant="filled"
              />
            </Stack>
          </Stack>
          <Stack sx={buttonStyle}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                color="primary"
              >
                Lưu đơn đăng kiểm
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
              >
                Xóa đơn đăng kiểm
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Modal>
    </div>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.registrationDate}
        </TableCell>
        <TableCell align="right">{row.centerCode}</TableCell>
        <TableCell align="right">{row.centerName}</TableCell>
        <TableCell align="right">{row.carPlate}</TableCell>
        <TableCell align="right">{row.ownerId}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <b>Thông tin chi tiết về xe</b>
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Hãng xe</b>
                    </TableCell>
                    <TableCell>
                      <b>Tên xe</b>
                    </TableCell>
                    <TableCell>
                      <b>Ngày cấp xe</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Số khung</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Số máy</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Mục đích sử dụng</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.carDetails.map((carDetailsRow) => (
                    <TableRow key={carDetailsRow.carVIN}>
                      <TableCell component="th" scope="row">
                        {carDetailsRow.carCompany}
                      </TableCell>
                      <TableCell>{carDetailsRow.carName}</TableCell>
                      <TableCell>{carDetailsRow.pickUpDate}</TableCell>
                      <TableCell align="right">
                        {carDetailsRow.carVIN}
                      </TableCell>
                      <TableCell align="right">{carDetailsRow.carEN}</TableCell>
                      <TableCell align="right">
                        {carDetailsRow.purpose}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    registrationDate: PropTypes.string.isRequired,
    centerCode: PropTypes.string.isRequired,
    centerName: PropTypes.string.isRequired,
    carPlate: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    carDetails: PropTypes.arrayOf(
      PropTypes.shape({
        carName: PropTypes.string.isRequired,
        carCompany: PropTypes.string.isRequired,
        pickUpDate: PropTypes.string.isRequired,
        carVIN: PropTypes.string.isRequired,
        carEN: PropTypes.string.isRequired,
        purpose: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function RegistrationTable() {
  const [page, setPage] = React.useState(1);
  const [numberOfPages, setNumberOfPages] = React.useState(1);
  const [rows, setRows] = React.useState([]);

  const handlePageChange = (event, value) => {
    setPage(value);
    console.log(value);
    fetch(`http://localhost:5000/registration?page=${value}&size=5`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => updatePageData(data));
  };

  function updatePageData(data) {
    let pages = data.total;
    if(pages % 5 == 0) {
      setNumberOfPages(pages/5);
    } else {
      setNumberOfPages(Math.ceil(pages/5));
    }
    console.log(data.data);
    let tmpRows = [];
    for (let i = 0; i < data.data.length; i++) {
      let tmp = data.data[i];
      let regCenter = tmp.RegCenter, regId, regName;
      if(regCenter == null) {
        regId="admin"
        regName="admin"
      } else {
        regId=regCenter.id;
        regName=regCenter.name;
      }
      tmpRows[i] = createData(
        String(format(parseISO(tmp.ngayHetHan), 'dd-MM-yyyy')),
        regId,
        regName,
        tmp.Car.bienSo,
        tmp.OwnerId,
        tmp.Car.hangXe,
        tmp.Car.tenXe,
        String(format(parseISO(tmp.Car.ngayCapXe), 'dd-MM-yyyy')),
        tmp.Car.soKhung,
        tmp.Car.soMay,
        tmp.Car.mucDich
      );
    }
    setRows(tmpRows);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <b>Ngày hết hạn</b>
              </TableCell>
              <TableCell align="right">
                <b>Mã trung tâm</b>
              </TableCell>
              <TableCell align="right">
                <b>Tên trung tâm</b>
              </TableCell>
              <TableCell align="right">
                <b>Biển số xe</b>
              </TableCell>
              <TableCell align="right">
                <b>CMND/CCCD chủ xe</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={numberOfPages}
        page={page}
        sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}
        onChange={handlePageChange}
      ></Pagination>
    </>
  );
}
