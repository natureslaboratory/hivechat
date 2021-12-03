import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  useAcceptMemberRequestMutation,
  useDeleteMemberRequestMutation,
  useGetMemberRequestsQuery,
} from "../services/queryApi";
import MemberRequest from "./MemberRequest";

const MemberRequests: React.FunctionComponent<{ orgID: number }> = (props) => {
  const {
    data: responses,
    error,
    isLoading,
    isFetching
  } = useGetMemberRequestsQuery(props.orgID);

  const [acceptRequest, { data }] = useAcceptMemberRequestMutation();
  const [deleteRequest] = useDeleteMemberRequestMutation();

  if (isLoading) {
      console.log("loading");
  }
  if (isFetching) {
      console.log("fetching");
  }
  if (responses) {
      console.log(responses);
  }

  let message = responses ? "No requests" : "Loading...";

  if (error) {
    message = "Error";
  }

  let placeholder = (
    <tr>
      <td colSpan={4}>{message}</td>
    </tr>
  );
  let requests = responses && responses.length
    ? responses.map((r) => <MemberRequest {...r} key={r.member.memberID} handleAccept={() => acceptRequest(r)} handleDelete={() => deleteRequest(r)} />)
    : placeholder;

  return (
    <div className="card mb-3">
      <div style={{ justifyContent: "space-between" }} className="card-header">
        <h5 className="card-title m-b-0">Member Requests</h5>
      </div>
      <div className="table-responsive">
        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{requests}</tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberRequests;
