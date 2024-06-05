import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { format, parseISO } from "date-fns";

import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PieChart() {
  const [pieData, setPieData] = useState([
    {
      name: "Click để xem",
      total: 1,
    },
    {
      name: "Double click để xem dự đoán",
      total: 0,
    },
  ]);
  const [registTotal, setRegistTotal] = useState({});
  const [expiredTotal, setExpiredTotal] = useState({});

  const [inMonthData, setInMonthData] = useState({
    labels: pieData.map((data) => data.name),
    datasets: [
      {
        label: "",
        data: pieData.map((data) => data.total),
        backgroundColor: ["#a29bfe"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  React.useEffect(() => {
    getRegistTotal();
    getExpiredTotal();
  }, []);

  function pushPieData() {
    let tmp = [];
    tmp[0] = registTotal;
    tmp[1] = expiredTotal;
    setInMonthData({
      labels: tmp.map((data) => data.name),
      datasets: [
        {
          label: "Số lượng xe",
          data: tmp.map((data) => data.total),
          backgroundColor: ["#12CBC4", "#1B1464"],
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    });
  }

  async function getRegistTotal() {
    let month = new Date(Date.now()).getMonth() + 1;
    let year = new Date(Date.now()).getFullYear();
    let stringMonth;
    if (month < 10) {
      stringMonth = "0" + month;
    } else {
      stringMonth = "" + month;
    }
    fetch(
      `http://localhost:5000/registration/regRecord?sDate=${year}-${stringMonth}-01&eDate=${year}-${stringMonth}-28&type=dangKy`,
      {
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) =>
        setRegistTotal({
          name: `Số lượng xe đăng kiểm trong tháng ${month}`,
          total: data.total,
        })
      );
  }

  async function getExpiredTotal() {
    let month = new Date(Date.now()).getMonth() + 1;
    let year = new Date(Date.now()).getFullYear();let stringMonth;
    if (month < 10) {
      stringMonth = "0" + month;
    } else {
      stringMonth = "" + month;
    }
    fetch(
      `http://localhost:5000/registration/regRecord?sDate=${year}-${
        stringMonth
      }-01&eDate=${year}-${stringMonth}-28&type=hetHan`,
      {
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) =>
        setExpiredTotal({
          name: `Số lượng xe hết hạn trong tháng ${month}`,
          total: data.total,
        })
      );
  }

  function createData(carPlate, ownerId, registrationDate, expirationDate) {
    return { carPlate, ownerId, registrationDate, expirationDate };
  }

  const [rows, setRows] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [page, setPage] = React.useState(1);
  const [numberOfPages, setNumberOfPages] = React.useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
    let month = new Date(Date.now()).getMonth() + 1;
    let year = new Date(Date.now()).getFullYear();
    let stringMonth;
    if (month < 10) {
      stringMonth = "0" + month;
    } else {
      stringMonth = "" + month;
    }
    fetch(
      `http://localhost:5000/registration/regRecord?sDate=${year}-${
        stringMonth
      }-01&eDate=${year}-${stringMonth}-28&page=${value}&size=5&type=hetHan`,
      {
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => updatePageData(data));
  };

  function updatePageData(data) {
    let pages = data.total;
    if (pages % 5 == 0) {
      setNumberOfPages(pages / 5);
    } else {
      setNumberOfPages(Math.ceil(pages / 5));
    }
    console.log(data.data);
    let tmpRows = [];
    for (let i = 0; i < data.data.length; i++) {
      let tmp = data.data[i];
      tmpRows[i] = createData(
        tmp.CarBienSo,
        tmp.OwnerId,
        String(format(parseISO(tmp.createdAt), "dd-MM-yyyy")),
        String(format(parseISO(tmp.ngayHetHan), "dd-MM-yyyy"))
      );
    }
    setRows(tmpRows);
  }

  return (
    <div style={{ width: 590, marginTop: 50 }}>
      <Pie
        data={inMonthData}
        id="pieChart"
        onDoubleClick={handleOpen}
        onClick={pushPieData}
      ></Pie>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Bảng dự đoán xe đăng kiểm trong tháng</b>
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Biển số xe</b>
                  </TableCell>
                  <TableCell>
                    <b>CMND/CCCD chủ xe</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Ngày đăng kiểm</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Ngày hết hạn</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.carPlate}
                    </TableCell>
                    <TableCell>{row.ownerId}</TableCell>
                    <TableCell align="right">{row.registrationDate}</TableCell>
                    <TableCell align="right">{row.expirationDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={numberOfPages}
            page={page}
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              m: 1,
              pb: 0,
              mb: 0,
            }}
            onChange={handlePageChange}
          ></Pagination>
        </Box>
      </Modal>
    </div>
  );
}

export default PieChart;
