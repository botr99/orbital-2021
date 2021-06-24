import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import PaginationLimit from "../PaginationLimit/PaginationLimit";

const Registrations = ({ registrations, isOrganizerOrAdmin }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const pageCount = Math.ceil(registrations.length / limit);

  // uncomment this to view the registrations for each job post,
  // provided you are logged in.
  // isOrganizerOrAdmin = true;

  return (
    <>
      {isOrganizerOrAdmin && (
        <>
          <Typography variant="h5" align="center" gutterBottom>
            Registrations
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="job registrations table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registrations
                  .slice((page - 1) * limit, page * limit)
                  .map((reg) => (
                    <TableRow key={reg.email}>
                      <TableCell>{reg.name}</TableCell>
                      <TableCell>{reg.contactNum}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <PaginationLimit
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            limit={limit}
            setLimit={setLimit}
          />
        </>
      )}
    </>
  );
};

export default Registrations;
