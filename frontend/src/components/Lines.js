import React, {useState, useEffect, useMemo, useRef} from "react";
import ApiBackendService from "../services/ApiBackendService";
import {usePagination, useSortBy, useTable} from "react-table";

export default (props) => {

    const [linesData, setLinesData] = useState([]);
    const [pageCountUpdated, setPageCountUpdted] = useState(0);
    const linesDataRef = useRef();
    linesDataRef.current = linesData;

    const fetchLines = () => {
        const sortByCond = sortBy.length > 0 ? sortBy[0].id + ',' + (sortBy[0].desc ? 'desc' : 'asc') : null;
        ApiBackendService.getLines({pageIndex, pageSize, sortByCond})
            .then((response) => {
                setLinesData(response.data._embedded.lines);
                setPageCountUpdted(response.data.page.totalPages);
                this.state.pageCount = 10;
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteLine = (rowIndex) => {
        const id = linesDataRef.current[rowIndex].id;

        ApiBackendService.removeLine(id)
            .then((response) => {
                props.history.push("/lines");

                let newconnectionsData = [...linesDataRef.current];
                newconnectionsData.splice(rowIndex, 1);

                setLinesData(newconnectionsData);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const columns = useMemo(
        () => [
            {
                Header: "#",
                accessor: "id",
                sortable: true
            },
            {
                Header: "Number",
                accessor: "number",
                sortable: true
            },
            {
                Header: "Description",
                accessor: "description",
                sortable: true
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <span onClick={() => deleteLine(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        state: {pageIndex, pageSize, pageCount, sortBy},
    } = useTable({
        columns,
        data: linesData,
        initialState: {pageIndex: 0, pageSize: 10, pageCountUpdated: 0},
        manualPagination: true,
        pageCount: pageCountUpdated,
        autoResetSortBy: false,
        autoResetPage: false,
        manualSortBy: true,
    }, useSortBy, usePagination);

    useEffect(() => {
        fetchLines();
    }, [pageSize, pageIndex, pageCount, sortBy]);

    return (
        <div className="list row">
            <div className="col-md-12">
                <div className="input-group mb-12">

                    <table
                        className="table table-striped table-bordered"
                        {...getTableProps()}
                    >
                        <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        <span>
                    {column.isSorted && column.sortable
                        ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                        : ""}
                  </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </button>
                        {' '}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </button>
                        {' '}
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </button>
                        {' '}
                        <button onClick={() => gotoPage(pageCountUpdated - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </button>
                        {' '}
                        <span>
          Page{' '}
                            <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}
