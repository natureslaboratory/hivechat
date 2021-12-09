import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useGetMemberDetailsQuery, useLoginMutation } from '../services/newApi';

const Login: React.FC = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login] = useLoginMutation();
    const { data: member, isLoading } = useGetMemberDetailsQuery("");

    function submit(e: React.MouseEvent) {
        e.preventDefault();
        login({
            email,
            password
        });
    }

    if (!isLoading && member.memberEmail) {
        return <Redirect to="/account" />
    }

    return (
        <div className="card-body">
            <h5 className="card-title">Sign in</h5>
            <form>
                <div className="position-relative form-group">
                    <label htmlFor="form1_email">Email</label>
                    <input id="form1_email" name="email" className="form-control" type="email" required={true} autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="position-relative form-group">
                    <label htmlFor="form1_password">Password</label>
                    <input id="form1_password" name="password" className="form-control" type="password" required={true} autoComplete="off" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div>
                    <input id="form1_submit" name="submit" className="mt-1 btn btn-primary" value="Log in" type="submit" onClick={submit} />
                    <p style={{ marginTop: "2rem" }}>Forgotten your password? <a href="/admin/reset">Reset it now</a>.</p>
                    <p>No account? <a href="/admin/register?r=">Register</a>.</p>
                </div>
            </form>
        </div>
    )
}

export default Login;