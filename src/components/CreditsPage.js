// ----- Imports -----
import React from 'react';
import {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Helmet from 'react-helmet';
import axios from 'axios';

import comma_string_maker from './helper_functions/comma_string_maker'
import ListingNamesComponent from './helper_functions/ListingNamesComponent'

// Spotify required info
const spotify_id = `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}`;
const spotify_secret = `${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`;
const spotify_redirect_uri = `${process.env.REACT_APP_REDIRECT_URI}`;

// Genius required info
const genius_client_access_token = `${process.env.REACT_APP_GENIUS_ACCESS_TOKEN}`;

// ----- Main Function -----
export default function CreditsPage(props) {

  const spotify_auth_code = props.spotify_auth_code;

  // FRONTEND CHANGE: Adding the AWS API here
  const aws_api_endpoint = `${process.env.REACT_APP_AWS_API}` + new URLSearchParams({
    spotify_auth_code: spotify_auth_code,
    spotify_redirect_uri: spotify_redirect_uri,
    spotify_id: spotify_id,
    spotify_secret: spotify_secret,
    genius_client_access_token: genius_client_access_token
  });

  // Defining useState hooks
  const [creditsMessage, setCreditsMessage] = useState({full_title: '', album_image:'', featured_artists_names: [], writers_names: [], producers_names: [], custom_performances: []});
  
  useEffect(() => {

    // Hit AWS api to get genius song data
    const fetchApiData = async () => {
      const res_genius_song_data = await axios.get(aws_api_endpoint);
      console.log('Genius Song Data Received!: ', res_genius_song_data);

      setCreditsMessage({full_title: res_genius_song_data.data.response.song.full_title, 
        album_image: res_genius_song_data.data.response.song.song_art_image_url,
        featured_artists_names: res_genius_song_data.data.response.song.featured_artists, 
        writers_names: res_genius_song_data.data.response.song.writer_artists, 
        producers_names: res_genius_song_data.data.response.song.producer_artists,
        custom_performances: res_genius_song_data.data.response.song.custom_performances});
    }

    // calling the fetchApiData function
    fetchApiData()
    .catch((err) => console.log('Oops, an error occured!', err));

  }, []);
  

  return (
    <div>
      <Container className='roboto-mono-google-font'>
        <Row className='mt-4'>
          <Col sm={5}>
            {creditsMessage && 
              <div>
                <Image src={creditsMessage.album_image} fluid rounded width='300px' length='auto'></Image>
                <h3 class="mt-3">{creditsMessage.full_title}</h3>
              </div>
            }
          </Col>
          <Col sm={7}>
            {creditsMessage && 
              <div class="ms-4">
                {creditsMessage.featured_artists_names.length!=0 && <ListingNamesComponent title='Feature Artists' credits_list={creditsMessage.featured_artists_names} />}
                {creditsMessage.writers_names.length!=0 && <ListingNamesComponent title='Writers' credits_list={creditsMessage.writers_names} />}
                {creditsMessage.producers_names.length!=0 && <ListingNamesComponent title='Producers' credits_list={creditsMessage.producers_names} />}
                {creditsMessage.custom_performances.length!=0 && <div>
                  <h4>Custom Performances</h4>
                  <ul>
                    {creditsMessage.custom_performances.map(item => (
                        <li key={item.label}>{item.label}: {comma_string_maker(item.artists)}</li>
                    ))}
                  </ul>
                </div>}

              </div>
            }
          </Col>
        </Row>
      </Container>
      <Helmet bodyAttributes={{style: 'background-color : #fae7b4'}}/>
    </div>
  );
}