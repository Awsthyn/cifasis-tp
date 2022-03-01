import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState, useEffect } from "react";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Queries(props) {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/queries/${query.id}`,
    fetcher
  );
  const [columsName, setColumnsName] = useState([]);
  useEffect(()=>{
    if (data?.data?.length) setColumnsName(Object.keys(data.data[0]))
  },[data])
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Cargando...</div>;
  if (!data?.data?.length) return <div>Sin resultados</div>

  return (
    <Layout>
      <>
      <div className="m-4">
            <p><b>{data.question || ""}</b></p>
        </div>
        <div className="m-4">
            <p>Query realizada: </p>
            <p>{data.query || ""}</p>
        </div>
        <table className="m-4 w-75 table">
          <thead>
            <tr>
              {columsName.map((item) => (
                    <th scope="col">{item}</th>
                  ))
                }
            </tr>
          </thead>
          <tbody>
            {data.data.map(item => 
                 <tr>
                {columsName.map(column => <td>{item[column]}</td> )}
                </tr>
            )}
          </tbody>
        </table>

      </>
    </Layout>
  );
}
