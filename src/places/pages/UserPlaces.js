import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [userPlaces, setUserPlaces] = useState(null);

  const userId = useParams().userId;

  useEffect(() => {
    try {
      const fetchPlaces = async () => {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setUserPlaces(responseData.places);
      };
      fetchPlaces();
    } catch (err) {}
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setUserPlaces((prevPlace) => {
      return prevPlace.filter((place) => place.id !== deletedPlaceId);
    });
  };


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && userPlaces && (
        <PlaceList items={userPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
