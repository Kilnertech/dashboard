import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { callAPI, buildURL, rootAPI } from "api/callAPI";
import { useState, useEffect } from "react";

// Function to convert a string to Title Case
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Function to swap first name and last name
function swapNameOrder(name) {
  const [firstName, lastName] = name.split(" ");
  return `${lastName} ${firstName}`;
}

// Component for Author information display
function Author({ imgLink, name, href }) {
  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={imgLink} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
            {name}
          </a>
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

Author.propTypes = {
  imgLink: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

// Function to create table data
export function CreateAuthorsTableData() {
  const [mepList, setMepList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await callAPI(buildURL(rootAPI, "MEPs/mep_info"), "GET");
        setMepList(data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData(); // Corrected placement of fetchData() call inside useEffect
  }, []); // Empty dependency array ensures useEffect runs once on mount

  const rows = mepList.map((author) => ({
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

  const columns = [
    {
      Header: "MP",
      accessor: "mp",
      width: "30%",
      align: "left",
      Cell: ({ value }) => <Author imgLink={value.imgLink} name={value.name} href={value.href} />,
      sortType: (rowA, rowB, columnId, desc) => {
        return rowA.original.mp.name.localeCompare(rowB.original.mp.name);
      },
    },
    {
      Header: "Party",
      accessor: "party",
      align: "left",
      Cell: ({ value }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value}
        </MDTypography>
      ),
    },
    {
      Header: "Country",
      accessor: "country",
      align: "left",
      Cell: ({ value }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value}
        </MDTypography>
      ),
    },
    {
      Header: "Group",
      accessor: "group",
      align: "left",
      Cell: ({ value }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value}
        </MDTypography>
      ),
    },
    // You can add more columns as needed
  ];

  return { columns, rows };
}
