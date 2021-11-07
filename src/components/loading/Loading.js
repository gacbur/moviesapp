import ClipLoader from 'react-spinners/ClipLoader'

import "./Loading.css"

const Loading = ({ size, color }) =>
    <div className="loader">
        <ClipLoader
            size={size}
            color={color || "#1a1a1a"}
        />
    </div>

export default Loading
