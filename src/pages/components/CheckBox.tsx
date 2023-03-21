import React from 'react'

export default function CheckBox({text, id, value}) {
  return (
    <>
 <div className="checkbox-wrapper-37 m-5">
  <input value={value} type="checkbox" name="interests" id={id} />
  <label htmlFor={id} className="terms-label">
    <svg
      className="checkbox-svg"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id={id} fill="white">
        <rect width="200" height="200" />
      </mask>
      <rect
        width="200"
        height="200"
        className="checkbox-box"
        stroke-width="40"
        mask={`url(#${id})`}
      />
      <path
        className="checkbox-tick"
        d="M52 111.018L76.9867 136L149 64"
        stroke-width="15"
      />
    </svg>
    <span className="label-text">{text}</span>
  </label>
</div>
</>
  )
}
