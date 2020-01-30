import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(allUsersQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allUsers.map(({ id, email }) => (
    <div key={id}>
      <p>
        {id}: {email}
      </p>
    </div>
  ));
}
