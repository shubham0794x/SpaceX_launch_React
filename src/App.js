import React from 'react';

import {
  AppContainer,
  Header,
  ViewSection,
  LaunchInfoSection,
  CardsContainer,
  SideBar,
  LoaderAligner,
  DetailKey,
  Footer,
} from "./styling";

import Cards from "./components/Cards/card";
import Axios from "axios";
import filter from "./components/Filter/filter";

const baseUrl = `https://api.spaceXdata.com/v3/launches?limit=100`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [programData, setProgramData] = useState([]);
  const [selectedYear, setYearFilter] = useState(null);
  const [launchStatus, setLaunchFilter] = useState(null);
  const [landStatus, setLandFilter] = useState(null);

const handleStatusFilter = (type, status) => {
    if (type === "launch") {
      setLaunchFilter(status);
      return;
    }
    setLandFilter(status);
  };

    const handleYearFilter = (v) => {
    v.stopPropagation();
    const year = v.target.dataset.year;
    setYearFilter(year);
  };

  useEffect(() => {
    const updateData = async (filters) => {
      setIsLoading(true);
      const { data } = await Axios.get(baseUrl, {
        params: {
          launch_year: selectedYear,
          launch_success: launchStatus,
          land_success: landStatus,
          ...filters,
        },
      });
      setIsLoading(false);
      setProgramData(data);
    };
    updateData();
  }, [selectedYear, landStatus, launchStatus]);


