import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  tableCellClasses,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { color } from "../utils/theme";
import { useAtom, useAtomValue } from "jotai";
import { emailsAtom, isInputActiveAtom } from "../state";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: color.primary,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTable = () => {
  const [emails, setEmails] = useAtom(emailsAtom);
  const isInputActive = useAtomValue(isInputActiveAtom);

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>
            번호
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>
            메일 제목
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>
            결과
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {emails.map((row, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell align="center">{index + 1}</StyledTableCell>
            <StyledTableCell component="th" scope="row" align="center">
              <TextField
                id="tf-email-title"
                variant="standard"
                fullWidth
                disabled={!isInputActive}
                defaultValue={row.title}
                onChange={(e) => {
                  setEmails(
                    emails.map((email, i) => {
                      if (i === index) {
                        return { ...email, title: e.target.value };
                      }
                      return email;
                    })
                  );
                }}
              />
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sx={{
                fontWeight: "bold",
                color: row.result === "spam" ? color.red : "",
              }}
            >
              {row.result !== undefined ? (row.result === "spam" ? "스팸" : "정상") : ""}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StyledTable;
