import { useParams, useNavigate } from "react-router-dom";
export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} navigate={useNavigate()} />;
  };
}
