import { useRouteError } from 'react-router-dom';
import '../index.css';

export default function ErrorPage(){
    const error = useRouteError();
    console.log(error);

    return (
        <div id='error-page'>
            <h1 style={{marginBottom: '2rem'}}>Oops! Something went Wrong.</h1>
            <p style={{marginBottom: '2rem'}}>Sorry, an unexpected error has occurred.</p>
            <p><em>{error.status} {error.statusText}</em></p>
        </div>
    )
}