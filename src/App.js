import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import './style.scss';

let PageSize = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalData, setTotalData] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${currentPage}&size=${PageSize}`);
      const data = await res.json();
      setTotalData(data.totalPassengers)
      setPosts(data.data);
    };
    getPosts();
  }, [currentPage])

  const pages = [];
  for (let i = 0; i <= Math.ceil(totalData / PageSize); i++) {
    pages.push(i + 1);
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>TRIPS</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(item => {
            return (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.trips}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={pages.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
