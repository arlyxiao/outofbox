import React from 'react'
import Link from 'next/link'
import Router from 'next/router'


const PaginationLink = (props) => (
    <Link as={`${props.pathName}?${props.page}`} href={`${props.pathName}?${props.page}`}>
        <a className="page-link" onClick={props.updatePaginationStates}>{props.name}</a>
    </Link>
)

export default class Pagination extends React.Component {

    constructor(props) {
        super(props)

        const currentPage = props.currentPage;
        const totalPageNumber = Math.ceil(props.dataTotal / props.pageSize);
        const maxPageNumber = parseInt(props.maxPageNumber)
        const pageNumberData = this.refreshPageNumber(currentPage, maxPageNumber, totalPageNumber);

        this.state = {
            start: 1,
            dataTotal: props.dataTotal,
            prevPage: props.prevPage,
            nextPage: props.nextPage,
            pageNumber: pageNumberData.pageNumber,
            numberArray: pageNumberData.numberArray,
            currentPage: currentPage,
            pathName: props.pathName
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentPage !== prevProps.currentPage) {
            const currentPage = this.props.currentPage;
            const maxPageNumber = this.props.maxPageNumber;

            const totalPageNumber = Math.ceil(this.props.dataTotal / this.props.pageSize);
            const pageNumberData = this.refreshPageNumber(currentPage, maxPageNumber, totalPageNumber);

            const newStart = this.props.currentPage - pageNumberData.pageNumber + 1;
            this.setState({
                pathName: this.props.pathName,
                start: newStart > 0 ? newStart : 1,
                currentPage: this.props.currentPage,
                nextPage: this.props.nextPage,
                prevPage: this.props.prevPage,
                dataTotal: this.props.dataTotal,
                pageNumber: pageNumberData.pageNumber,
                numberArray: pageNumberData.numberArray
            });

        }
    }

    refreshPageNumber(currentPage, maxPageNumber, totalPageNumber) {
        const pageNumber = totalPageNumber >= maxPageNumber ? maxPageNumber :  totalPageNumber;
        if (currentPage <= pageNumber) {
            return {
                pageNumber: pageNumber,
                numberArray: [...(new Array(pageNumber))].map((_, i) => i + 1)
            }
        }

        const start = currentPage - pageNumber + 1;
        return {
            pageNumber: pageNumber,
            numberArray: [...(new Array(pageNumber))].map((_, i) => i + start)
        }
    }

    render() {
        const currentPage = this.state.currentPage;
        const pathName = this.state.pathName;
        return (
            <div>
                <nav aria-label="Page navigation">
                    <ul className="pagination">

                        {this.state.prevPage &&
                        <li className="page-item">
                            <PaginationLink page={this.state.prevPage}
                                            pathName={pathName}
                                            name="prev"/>
                        </li>
                        }

                        {this.state.start > 1 &&
                        <li className="page-item">
                            <PaginationLink page={'page=1'}
                                            pathName={pathName}
                                            name="1..."/>
                        </li>
                        }

                        {this.state.pageNumber > 1 &&
                        this.state.numberArray.map(function (number, index) {
                            let style = currentPage === number ? 'page-item active' : 'page_item';
                            return <li className={style} key={number}>
                                <PaginationLink page={'page=' + number}
                                                pathName={pathName}
                                                name={number}/>
                            </li>;
                        })
                        }


                        {this.state.nextPage &&
                        <li className="page-item">
                            <PaginationLink page={this.state.nextPage}
                                            pathName={pathName}
                                            name="next"/>
                        </li>
                        }

                    </ul>
                </nav>
            </div>
        );
    }
}
