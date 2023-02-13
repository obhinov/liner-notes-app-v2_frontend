import React from 'react'

export default function ListingNamesComponent(props) {
  const credits_list = props.credits_list;
  const title = props.title;
  return (
    <div>
    <h4>{title}</h4>
      <ul>
        {credits_list.map(contributor => (
            <li key={contributor.id}>{contributor.name}</li>
        ))}
      </ul>
    </div>
  )
}
