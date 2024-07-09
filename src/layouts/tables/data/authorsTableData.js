// layouts/tables/data/authorsTableData.js

import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Function to convert string to Title Case
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Function to swap first name and last name
function swapNameOrder(name) {
  const [firstName, lastName] = name.split(' ');
  return `${lastName} ${firstName}`;
}

// Function to create table data
export default function data(authorsList) {
  // Define the Author component
  const Author = ({ imgLink, name, href }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={imgLink} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          <a href={href} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            {name}
          </a>
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  // Define PropTypes for Author
  Author.propTypes = {
    imgLink: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
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
    mp: {
      imgLink: author.imgLink,
      name: toTitleCase(swapNameOrder(author.name)), // Swap name order and apply Title Case
      href: author.homepage,
    },
    country: author.country,
    party: author.party,
    group: author.group,
    contacts: author.homepage,
  }));

  return {
    columns: [
      {
        Header: "mp",
        accessor: "mp",
        width: "30%",
        align: "left",
        Cell: ({ value }) => (
          <div>
            <Author imgLink={value.imgLink} name={value.name} href={value.href} />
          </div>
        ),
        sortType: (rowA, rowB, columnId, desc) => {
          return rowA.original.mp.name.localeCompare(rowB.original.mp.name);
        },
      },
      { 
        Header: "party", 
        accessor: "party", 
        align: "left", 
        Cell: ({ value }) => (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {value}
          </MDTypography>
        ),
      },
      { 
        Header: "country", 
        accessor: "country", 
        align: "left", 
        Cell: ({ value }) => (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {value}
          </MDTypography>
        ),
      },
      { 
        Header: "group", 
        accessor: "group", 
        align: "left", 
        Cell: ({ value }) => (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {value}
          </MDTypography>
        )
      },
      // { 
      //   Header: "contacts", 
      //   accessor: "contacts", 
      //   align: "center" 
      // },
    ],
    rows,
  };
}
