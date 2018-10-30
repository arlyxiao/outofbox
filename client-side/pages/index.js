import React from 'react'
import Head from 'next/head'
import axios from 'axios';

export default class extends React.Component {
  static async getInitialProps () {
    const res = await axios.get('http://192.168.56.101:8000/moon/moon/?format=json');
    return {data: res.data}
  }
  render () {
    return (
      <div>
        <Head>
            <title>League Table</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.1/build/pure-min.css" />
        </Head>
        <div className="pure-g">
            <div className="pure-u-1-3"></div>
            <div className="pure-u-1-3">
              <h1>Barclays Premier League</h1>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>User Id</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                {this.props.data.results.map((standing, i) => {
                  const oddOrNot = i % 2 == 1 ? "pure-table-odd" : "";
                  return (
                      <tr key={i} className={oddOrNot}>
                        <td>{standing.user_id}</td>
                        <td>{standing.title}</td>
                      </tr>
                    );
                })}
                </tbody>
              </table>
            </div>
            <div className="pure-u-1-3"></div>
        </div>
      </div>
    );
  }
}
