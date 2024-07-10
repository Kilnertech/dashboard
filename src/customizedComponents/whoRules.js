import { Grid, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import {CreateAuthorsTableData} from 'data/mpIdentikit';

const WhoRuleTable = () => {

  const { rows, columns } = CreateAuthorsTableData();
  return (
    <Grid item xs={12}>
      <Card>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            Who Rule
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            table={{ columns, rows }}
            isSorted={true}
            entriesPerPage={true}
            showTotalEntries={false}
            noEndBorder
          />
        </MDBox>
      </Card>
    </Grid>
  );
};

export default WhoRuleTable;
