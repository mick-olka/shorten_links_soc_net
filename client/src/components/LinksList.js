import React from 'react';
import {Link} from 'react-router-dom';

export const LinksList = ({ links }) => {
    if (!links.length) {
        return <p className="center" >No Links for now</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Origin</th>
                <th>Shorted</th>
                <th>º</th>
            </tr>
            </thead>

            <tbody>
            { links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index+1}</td>
                        <td><a href={link.from} target="_blank" rel="noopener noreferrer" >{link.from}</a></td>
                        <td><a href={link.to} target="_blank" rel="noopener noreferrer" >{link.to}</a></td>
                        <td>
                            <Link to={`/detail/${link._id}`} >Info</Link>
                        </td>
                    </tr>
                );
            }) }
            </tbody>
        </table>
    )
}