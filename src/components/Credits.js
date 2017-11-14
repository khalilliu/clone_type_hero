import React from 'react';

const Credits = () => {
    return(
    <div className='credits'>
       <div className='me'>
        <p>
            copy by <a href='#'>@khaliliu</a>
        </p>
        <a
            className='twitter-share-button'
            href='https://twitter.com/intent/tweet?url=https://typehero.now.sh/&text=Try Google fonts on beautiful backgrounds & colors&via=iamtekeste'>
            >
            Tweet
        </a>
        <a className='twitter-follow-button'
            href="https://twitter.com/iamtekeste" data-show-screen-name="false" data-show-count="false">
            Follow
        </a>
       </div>
       <p>Search powed by <a href='#'>Algolia</a></p>
    </div>
    )
}

export default Credits;