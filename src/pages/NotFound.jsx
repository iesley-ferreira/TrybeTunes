import React from "react";
import "./styles/notFound.css";

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid='page-not-found' className='page-not-found'>
        <div>
          <h1>Page Not Found</h1>
        </div>
      </div>
    );
  }
}

export default NotFound;
