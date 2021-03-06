import styles from "./styles";
import NumberFormat from "react-number-format";
import { getDate } from "utils/time";
import { useCalendarState } from "context/calendar";
import { useEditItemDispatchContext } from "context/sideovers";
import { Items } from "types/items";
import Status from "components/Status";
import Checkbox from "../Checkbox";
import { CheckboxType } from "types/atoms";
import Actions from "../SelectedItemsActions";
interface Props {
  items: Items;
}

const table = {
  header: [
    <Checkbox type={CheckboxType.allItems} key="checkbox" />,
    "date",
    "name",
    "amount",
    "status",
  ],
};

const Header = () => (
  <styles.Header>
    <tr>
      {table.header.map((cell, index) => (
        <styles.HeaderCell key={index.toString()}>{cell}</styles.HeaderCell>
      ))}
    </tr>
  </styles.Header>
);

const Table = ({ items }: Props) => {
  const { selectedPeriod } = useCalendarState();
  const { openDetails } = useEditItemDispatchContext();

  return (
    <styles.TableWrapper>
      <styles.Table>
        <Header />
        <styles.Body>
          {items.map((item, index) => {
            const {
              current_status,
              name,
              provider,
              due_date,
              date,
              amount,
              type,
              id,
            } = item;

            const isPayment = type === "payment";

            return (
              <styles.Row key={index.toString()} onClick={openDetails(id)}>
                <styles.Cell>
                  <Checkbox type={CheckboxType.singleItem} id={id} />
                </styles.Cell>
                <styles.Cell className="table-cell--date">
                  {getDate(isPayment, due_date, date, selectedPeriod)}
                </styles.Cell>
                <styles.Cell>
                  <p className="table-text--name">{name}</p>
                  <p className="table-text--provider">{provider}</p>
                </styles.Cell>
                <styles.Cell className="table-cell--amount">
                  <NumberFormat
                    value={amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </styles.Cell>
                <styles.Cell className="table-cell--status">
                  <Status value={current_status} />
                </styles.Cell>
              </styles.Row>
            );
          })}
        </styles.Body>
      </styles.Table>
      <Actions />
    </styles.TableWrapper>
  );
};

export default Table;
