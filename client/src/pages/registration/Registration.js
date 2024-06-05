import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TableCell } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { addDays } from "date-fns";

import RegistrationTable from "../../components/RegistrationTable";

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
  ml: 28,
  mr: 28,
  mt: 2,
};

function ModalCreate() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [province, setProvince] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [ward, setWard] = React.useState("");
  const [specificAddress, setSpecificAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [lastName, setLastName] = React.useState(""); //Tên họ
  const [firstName, setFirstName] = React.useState("");
  const [purpose, setPurPose] = React.useState("");
  const [carVIN, setCarVIN] = React.useState("");
  const [carEN, setCarEN] = React.useState("");
  const [pickUpDate, setPickUpDate] = React.useState("");
  const [carCompany, setCarCompany] = React.useState("");
  const [carName, setCarName] = React.useState("");
  const [registrationDate, setRegistrationDate] = React.useState({});
  const [carPlate, setCarPlate] = React.useState("");
  const [ownerId, setOwnerId] = React.useState("");

  const [provinceState, setProvinceState] = React.useState([]);
  const [districtState, setDistrictState] = React.useState([]);
  const [wardState, setWardState] = React.useState([]);

  const body = () => {
    return {
      owner: {
        id: ownerId,
        name: lastName + firstName,
        phoneNum: phone,
        dob: addDays(dob, 1),
      },
      address: {
        thanhPho: province,
        quan: district,
        phuong: ward,
        chiTiet: specificAddress,
      },
      car: {
        bienSo: carPlate,
        hangXe: carCompany,
        tenXe: carName,
        soKhung: carVIN,
        soMay: carEN,
        mucDich: purpose,
        ngayCapXe: addDays(pickUpDate, 1),
        ownerId: ownerId,
      },
      ngayHetHan: addDays(registrationDate, 1),
    };
  };

  function extractDate(date) {
    return date.$d;
  }

  function handleCreateClick() {

    handleClose();

    fetch("http://localhost:5000/registration", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body()),
      cache: "default",
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }

  const getProvinceData = () => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((response) => response.json())
      .then((data) => setProvinceState(data));
  };

  React.useEffect(() => getProvinceData(), []);

  const handleProvinceOnChange = (event) => {
    setProvince(event.target.value);
    let index = 0;
    for (index; index < provinceState.length; index++) {
      if (provinceState[index].name == event.target.value) {
        break;
      }
    }
    let path = `https://provinces.open-api.vn/api/d/search/?q=*&p=${provinceState[index].code}`;
    fetch(path)
      .then((response) => response.json())
      .then((data) => setDistrictState(data));
  };

  const handleDistrictOnChange = (event) => {
    setDistrict(event.target.value);
    let index = 0;
    for (index; index < districtState.length; index++) {
      if (districtState[index].name == event.target.value) {
        break;
      }
    }
    let path = `https://provinces.open-api.vn/api/w/search/?q=*&d=${districtState[index].code}`;
    fetch(path)
      .then((response) => response.json())
      .then((data) => setWardState(data));
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{ my: 5 }}
        onClick={handleOpen}
        startIcon={<AddCircleIcon />}
      >
        Tạo đơn đăng kiểm
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Đơn đăng kiểm</b>
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
                onChange={(e) => setOwnerId(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Biển số xe đăng kiểm"
                variant="filled"
                onChange={(e) => setCarPlate(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ngày hết hạn đăng kiểm"
                  onChange={(date) => setRegistrationDate(extractDate(date))}
                />
              </LocalizationProvider>
            </Stack>
            <Stack spacing={2}>
              <TableCell>
                <b>Thông tin xe</b>
              </TableCell>
              <TextField
                id="filled-basic"
                label="Hãng xe"
                variant="filled"
                onChange={(e) => setCarCompany(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Tên xe"
                variant="filled"
                onChange={(e) => setCarName(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ngày cấp xe"
                  onChange={(date) => setPickUpDate(extractDate(date))}
                />
              </LocalizationProvider>
              <TextField
                id="filled-basic"
                label="Số khung"
                variant="filled"
                onChange={(e) => setCarVIN(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Số máy"
                variant="filled"
                onChange={(e) => setCarEN(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Mục đích sử dụng"
                variant="filled"
                onChange={(e) => setPurPose(e.target.value)}
              />
            </Stack>
            <Stack spacing={2}>
              <TableCell>
                <b>Thông tin chủ</b>
              </TableCell>
              <TextField
                id="filled-basic"
                label="Họ"
                variant="filled"
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Tên"
                variant="filled"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ngày sinh"
                  onChange={(date) => setDob(extractDate(date))}
                />
              </LocalizationProvider>
              <TextField
                id="filled-basic"
                label="SĐT"
                variant="filled"
                onChange={(e) => setPhone(e.target.value)}
              />
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Tỉnh
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleProvinceOnChange}
                >
                  {provinceState.map(({ name }, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Quận/Huyện
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleDistrictOnChange}
                >
                  {districtState.map(({ name }, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Xã/Phường
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={(e) => setWard(e.target.value)}
                >
                  {wardState.map(({ name }, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="filled-basic"
                label="Số nhà/Đường"
                variant="filled"
                onChange={(e) => setSpecificAddress(e.target.value)}
              />
            </Stack>
          </Stack>
          <Stack>
            <Button
              variant="contained"
              sx={buttonStyle}
              startIcon={<AddCircleIcon />}
              onClick={handleCreateClick}
            >
              Tạo đơn đăng kiểm
            </Button>
          </Stack>
        </Container>
      </Modal>
    </div>
  );
}

function Registration() {
  return (
    <>
      <Container fixed>
        <ModalCreate></ModalCreate>
        <RegistrationTable></RegistrationTable>
      </Container>
    </>
  );
}

export default Registration;