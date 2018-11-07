import React from 'react'
import Head from 'next/head'
import axios from 'axios';


export default class extends React.Component {
    static async getInitialProps() {
        const res = await axios.get('http://192.168.56.101:8000/moon/nodes/?format=json');
        return {data: res.data}
    }

    saveNode = () => {
        axios({
            method: 'POST',
            url: 'http://192.168.56.101:8000/moon/nodes/',
            data: {
                user_id: 1,
                title: 'Say hello to the world: ' + Math.random(),
                type: 'text',
                revisions: [
                    {'body': 'say world to you'}
                ]
            },
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    editNode = (id) => {
        axios({
            method: 'PUT',
            url: 'http://192.168.56.101:8000/moon/nodes/' + id + '/',
            data: {
                title: 'Say hello to the universe: ' + Math.random(),
                type: 'text',
                revisions: [
                    {'body': 'talk to her' + Math.random()}
                ]
            },
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        });
    }

    removeNode = (id) => {
        axios({
            method: 'DELETE',
            url: 'http://192.168.56.101:8000/moon/nodes/' + id + '/'
        });
    }

    render() {
        return (
            <div>
                <Head>
                    <title>League Table</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <div className="pure-g">
                    <div className="pure-u-1-3"></div>
                    <div className="pure-u-1-3">
                        <h1>Barclays Premier League</h1>
                        <table className="pure-table">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>User Id</th>
                                <th>Title</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.data.results.map((standing, i) => {
                                const oddOrNot = i % 2 == 1 ? "pure-table-odd" : "";
                                return (
                                    <tr key={i} className={oddOrNot}>
                                        <td>{standing.id}</td>
                                        <td>{standing.user_id}</td>
                                        <td>{standing.title}</td>
                                        <td onClick={() => this.editNode(standing.id)}>Edit</td>
                                        <td onClick={() => this.removeNode(standing.id)}>Remove</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>

                        <input type="text" name="title"/>
                        <input type="hidden" name="user_id" value="1"/>
                        <input type="submit" name="submit" value="submit" onClick={this.saveNode} />
                    </div>
                    <div className="pure-u-1-3"></div>
                </div>
            </div>
        );
    }
}
