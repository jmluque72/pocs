/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { useRef, useEffect, useState } from 'react'

import Realm from 'realm';

import { CardSchema,ModelSchema } from './models.js'

const databaseOptions = {
  path: 'realmT4.realm',
  schema: [CardSchema],
  schemaVersion: 0
};

const App: () => React$Node = () => {
  
  const [carlength, setCarLength] = useState(0)

  let realm = new Realm(databaseOptions)
  card = realm.objects("CardSchema");

  const sendImage = () => {

    const options = {
      includeBase64: true
    }

    launchImageLibrary(options, response => {
      if (onSelect) {
        onSelect(response)
      }
    })
  }

  const onSelect = (response) => {
    const base64 = response.base64;
    const body = {
      "image": "data:image/png;base64," + base64
    }

    let responsef = fetch("https://w6saisactf.execute-api.us-east-1.amazonaws.com/Prod/location-uuid", {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then((response1) => {
        alert(response1.status);
      })
      .then((response1) => {
        alert(response1);
      })
      .catch(error => {
        alert(error);
        this.setState({ loading: false, error: error })
      })
  }
  
  const addCard = () => {

    realm.write(() => {
      realm.create('CardSchema', {
        CardId: card.filtered("CardId > 0").length + 1,
        CardName: "Fiat 500 fachero1",
        CardModel: "Fiat 500 sport",
      });
      var lengthcar = card.filtered("CardName like '%Fiat 500 fachero%'").length
      setCarLength(lengthcar);
    });
  }

  return (
    <View style={{ flex: 1, paddingTop: 100, paddingLeft: 100 }}>
      <Text style={{ fontSize: 20 }}> Cars: {carlength}</Text>

      <TouchableWithoutFeedback onPress={() => addCard()}>
        <Text style={{ marginTop: 20, fontSize: 20 }}> ADD NEW CAR</Text>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => sendImage()}>
        <Text style={{ marginTop: 20, fontSize: 20 }}> Load image from gallery</Text>
      </TouchableWithoutFeedback>

    </View>
  );
};


export default App;
