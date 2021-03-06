import SectionTitle from "components/SectionTitle";
import Sidebar from "components/Sidebar";
import TopBar from "./components/TopBar";
import Table from "./components/Table";
import styled from "styled-components";
import AddNewItem from "components/AddNewItem";
import Summary from "./components/Summary";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 24px;
`;

const Main = () => {
  return (
    <>
      <div className="container container--with-sidebar">
        <SectionTitle text="Payments & Expenses" />
        <TopBar />
        <TableContainer>
          <Table />
        </TableContainer>
        <AddNewItem />
      </div>
      <Sidebar>
        <Summary />
      </Sidebar>
    </>
  );
};

export default Main;
