import { useEffect, useState } from "react"
import { getUsers } from "../services"
import './style.scss'

export function Home() {
    const [dataAPI, setDataAPI] = useState([])

    const [search, setSearch] = useState('')
    const searchLowerCase = search.toLowerCase()

    const filteredData = dataAPI.filter(user => user.email.toLowerCase().includes(searchLowerCase))

    useEffect(() => {
        (async () => {
            const response = await getUsers()
            setDataAPI(response.data)
        })()
    }, [])

    const itemsPerPage = 10
    const [currentPage, setCurrentPage] = useState(1);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;

    const currentPageData = filteredData.slice(firstItemIndex, lastItemIndex);
    console.log(lastItemIndex)

    return (
        <>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" />
            <ul>
                {
                    currentPageData.map((item, index) => (
                        <li key={index}>
                            {item.email}
                        </li>
                    ))
                }
            </ul>

            <PaginationExample
                data={filteredData}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}



const PaginationExample = ({ data, currentPage, setCurrentPage, itemsPerPage }) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pagesToShow = 5;

    const handlePrevPage = () => setCurrentPage(currentPage - 1)
    const handleNextPage = () => setCurrentPage(currentPage + 1)

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const start = currentPage - Math.floor(pagesToShow / 2);
    const end = currentPage + Math.floor(pagesToShow / 2);
    const pageList = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedPages = pageList.slice(
        Math.max(0, start - 1),
        Math.min(totalPages, end)
    );

    return (
        <div>

            <ul className="list-buttons">
                <li>
                    <button className="prev" disabled={currentPage === 1}
                        onClick={handlePrevPage}>
                        Anterior
                    </button>
                </li>
                {displayedPages.map((page) => (
                    <li>
                        <button className={`btn-radious ${page === currentPage ? "active" : ""}`} key={page} onClick={() => handlePageChange(page)}>
                            {page}
                        </button>
                    </li>
                ))}
                <li>
                    <button className="next" disabled={currentPage === Math.ceil(data.length / itemsPerPage)} onClick={handleNextPage}>
                        Proximo
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default PaginationExample;

