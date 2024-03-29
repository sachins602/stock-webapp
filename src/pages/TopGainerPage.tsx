import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  styled,
  TableCell,
  tableCellClasses,
  Container,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface GainerLoserInterface {
  Id: number;
  Symbol: string;
  CompanyName: string;
  Ltp: string;
  Change: string;
  PercentChange: string;
}
const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#78909c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledGainerTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "green",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledLoserTableCell: any = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "red",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: '#3F4E4F',
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const TopGainersLosers = () => {
  const [topGainers, setTopGainers] = useState<GainerLoserInterface[]>([]);
  const [topLosers, setTopLosers] = useState<GainerLoserInterface[]>([]);
  const [isGainerLoading, setIsGainerLoading] = useState(true);
  const [isLoserLoading, setIsLoserLoading] = useState(true);

  const getGainer = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/gainer");
      setTopGainers(response.data);
      setIsGainerLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getLoser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/loser");
      setTopLosers(response.data);
      setIsLoserLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGainer();
    getLoser();
  }, []);

  return (
    <div>
      <Container
        sx={{ padding: 2, display: "flex", mt: "-300px", ml: "250px" }}
      >
        <Grid>
          <h1>Top Gainers</h1>
          {!isGainerLoading ? (
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledGainerTableCell
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      Symbol
                    </StyledGainerTableCell>
                    <StyledGainerTableCell
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      Company Name
                    </StyledGainerTableCell>
                    <StyledGainerTableCell
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      LTP(Rs)
                    </StyledGainerTableCell>
                    <StyledGainerTableCell
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      Change
                    </StyledGainerTableCell>
                    <StyledGainerTableCell
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      Percent Change
                    </StyledGainerTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topGainers.map((row) => (
                    <TableRow key={row.Id}>
                      <StyledTableCell>{row.Symbol}</StyledTableCell>
                      <StyledTableCell>{row.CompanyName}</StyledTableCell>
                      <StyledTableCell>{row.Ltp}</StyledTableCell>
                      <StyledTableCell>{row.Change}</StyledTableCell>
                      <StyledTableCell>{row.PercentChange}</StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>Loading...</div>
          )}
        </Grid>

        <Grid sx={{ paddingLeft: 4 }}>
          {" "}
          <h1>Top Losers</h1>
          {!isLoserLoading ? (
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledLoserTableCell
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      Symbol
                    </StyledLoserTableCell>
                    <StyledLoserTableCell
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      Company Name
                    </StyledLoserTableCell>
                    <StyledLoserTableCell
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      LTP(Rs)
                    </StyledLoserTableCell>
                    <StyledLoserTableCell
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      Change
                    </StyledLoserTableCell>
                    <StyledLoserTableCell
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      Percent Change
                    </StyledLoserTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topLosers.map((row) => (
                    <TableRow key={row.Id}>
                      <StyledTableCell>{row.Symbol}</StyledTableCell>
                      <StyledTableCell>{row.CompanyName}</StyledTableCell>
                      <StyledTableCell>{row.Ltp}</StyledTableCell>
                      <StyledTableCell>{row.Change}</StyledTableCell>
                      <StyledTableCell>{row.PercentChange}</StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>Loading...</div>
          )}
        </Grid>
      </Container>
    </div>
  );
};
