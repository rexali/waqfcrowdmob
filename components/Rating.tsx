import React, { useState } from 'react';
import { View, Text } from 'react-native';
import StarRating from 'react-native-star-rating';
import { rateWaqf } from '../views/waqfs/utils/rateWaqf';
import { useDispatch } from 'react-redux';

const Rating = ({ waqfId, userId, userRate }: { waqfId?: any, userId?: any, userRate?: any }) => {
  const [rating, setRating] = useState<any>();
  const dispatch = useDispatch<any>()

  const onStarRatingPress = (rating: React.SetStateAction<number>) => {
    const ratingData = {
      rating,
      waqfId,
      userId
    }
    setRating(rating);
    rateWaqf(ratingData, dispatch);
  };
  
  return (
    <View>
      <StarRating
        disabled={false}
        maxStars={5} 
        rating={rating ?? userRate}
        selectedStar={onStarRatingPress}
        starSize={15}
        fullStarColor='red' 
      />
      <Text>{userRate}/5</Text>
    </View>
  );
};

export default Rating;
