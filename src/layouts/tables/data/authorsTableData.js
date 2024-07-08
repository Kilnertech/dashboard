// layouts/tables/data/authorsTableData.js

import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Function to create table data
export default function data(authorsList) {
  // Define the Author component
  const Author = ({ imgLink, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={imgLink} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  // Define PropTypes for Author
  Author.propTypes = {
    imgLink: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  // Define the Group component
  const Group = ({ group }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {group}
      </MDTypography>
    </MDBox>
  );

  // Define PropTypes for Group
  Group.propTypes = {
    group: PropTypes.string.isRequired,
  };

  // Define the Homepage component
  const Homepage = ({ url }) => (
    <MDTypography component="a" href={url} variant="caption" color="text" fontWeight="medium">
      {url}
    </MDTypography>
  );

  // Define PropTypes for Homepage
  Homepage.propTypes = {
    url: PropTypes.string.isRequired,
  };

  // Build the rows using the authorsList
  const rows = authorsList.map((author) => ({
    name: <Author imgLink={author.imgLink} name={author.name} />,
    party: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {author.party}
      </MDTypography>
    ),
    group: <Group group={author.group} />,
    homepage: <Homepage url={author.homepage} />,
  }));

  return {
    columns: [
      { Header: "name", accessor: "name", width: "30%", align: "left" },
      { Header: "party", accessor: "party", align: "left" },
      { Header: "group", accessor: "group", align: "left" },
      { Header: "homepage", accessor: "homepage", align: "center" },
    ],
    rows,
  };
}
