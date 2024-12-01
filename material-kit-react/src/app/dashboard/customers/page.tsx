'use client';

import React, { useEffect, useState } from 'react';
import type { Metadata } from 'next';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore, onSnapshot } from 'firebase/firestore';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;
import firebaseConfig from './firebaseConfig';

require('dotenv').config();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Page(): React.JSX.Element {
  const [customers, setCustomers] = useState<any>([{
    h_level: 37533,
    factory: false,
    location: {
      Longitude: -5.2378,
      Latitude: 33.5557,
    },
  },
  {
    h_level: 16206,
    factory: false,
    location: {
      Longitude: -5.1714,
      Latitude: 33.5403,
    },
  },
  {
    h_level: 200000,
    factory: true,
    location: {
      Latitude: 33.4792,
      Longitude: -5.1831,
    },
  },
  {
    h_level: 7605,
    factory: false,
    location: {
      Latitude: 33.5846,
      Longitude: -5.1516,
    },
  },
  {
    h_level: 25155,
    factory: false,
    location: {
      Longitude: -5.0311,
      Latitude: 33.5016,
    },
  },
  {
    h_level: 347044,
    factory: true,
    location: {
      Longitude: -5.1654,
      Latitude: 33.5167,
    },
  },
  {
    h_level: 14503,
    factory: false,
    location: {
      Latitude: 33.5339,
      Longitude: -5.099,
    },
  },
  {
    h_level: 34553,
    factory: false,
    location: {
      Latitude: 33.5632,
      Longitude: -5.2126,
    },
  },
  {
    h_level: 5236,
    factory: false,
    location: {
      Latitude: 33.4909,
      Longitude: -5.0887,
    },
  },
  {
    h_level: 21715,
    factory: false,
    location: {
      Longitude: -5.0669,
      Latitude: 33.5617,
    },
  },
  {
    h_level: 324582,
    factory: true,
    location: {
      Longitude: -5.1197,
      Latitude: 33.5209,
    },
  }]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const page = 0;
  const rowsPerPage = 5;

  // useEffect(() => {
  //   // Set up real-time listener for Firestore
  //   const unsubscribe = onSnapshot(collection(db, 'inventory'), (snapshot) => {
  //     const data = snapshot.docs.map((doc) => {
  //       const docData = doc.data();
  //       return {
  //         id: doc.id,
  //         h_level: docData.h_level,
  //         factory: docData.factory,
  //         location: docData.location,
  //         createdAt: dayjs(docData.createdAt?.toDate()).toDate(), // Adjust if your Firestore stores a Timestamp
  //         demand: docData.h_level*1.5//should be the api call to the forcasting model
  //       };
  //     });
  //     setCustomers(data);
  //   });
  //   (error: Error) => {
  //     console.error('Error fetching inventory:', error);
  //   };

  //   // Clean up the listener on unmount
  //   return () => unsubscribe();
  // }, []);

  const handleAddInventory = async () => {
    if (latitude && longitude) {
      try {
        const newInventory = {
          h_level: 0, // Default value
          factory: false, // Default value
          location: {
            Latitude: latitude,
            Longitude: longitude,
          },
        };
        await addDoc(collection(db, 'inventory'), newInventory);
        alert('Inventory added successfully!');
        setLatitude(0); // Reset input fields
        setLongitude(0);
      } catch (error) {
        console.error('Error adding inventory: ', error);
        alert('Failed to add inventory');
      }
    } else {
      alert('Please enter both latitude and longitude');
    }
  };

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customers</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <CustomersFilters />
      <CustomersTable count={customers.length} page={page} rows={paginatedCustomers} rowsPerPage={rowsPerPage} />
      {/* Add New Inventory Section */}
      <Stack spacing={2} sx={{ marginTop: 3 }}>
        <Typography variant="h6">Add New Inventory</Typography>
        <TextField
          label="Latitude"
          type="number"
          variant="outlined"
          value={latitude}
          onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)} // Ensure valid number, default to 0 if invalid
          fullWidth
          inputProps={{
            inputMode: 'decimal', // Ensures the field supports decimal input
            pattern: '[0-9]*', // Optional: allows the user to enter numbers only
          }}
        />
        <TextField
          label="Longitude"
          type="number"
          variant="outlined"
          value={longitude}
          onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)} // Ensure valid number, default to 0 if invalid
          fullWidth
          inputProps={{
            inputMode: 'decimal', // Ensures the field supports decimal input
            pattern: '[0-9]*', // Optional: allows the user to enter numbers only
          }}
        />
        <Button variant="contained" color="primary" onClick={handleAddInventory} sx={{ marginTop: 2 }}>
          Add Inventory
        </Button>
      </Stack>
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
