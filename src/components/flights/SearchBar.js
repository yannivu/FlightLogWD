import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// SearchBar component that takes a setSearchQuery function as a prop
const SearchBar = ({ setSearchQuery }) => {
  // Handle input change event
  const handleInputChange = (event) => {
    // Update the search query state with the input value
    setSearchQuery(event.target.value);
  };

  return (
    // Render a TextField component with an outlined variant and a search icon
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      placeholder="Search by passenger name"
      onChange={handleInputChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
