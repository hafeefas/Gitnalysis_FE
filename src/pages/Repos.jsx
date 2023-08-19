import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserRepos } from '../redux/slices/repoSlice';
import RepoList from '../components/RepoList';
import '../login.css';
import DateRangeToolbar from '../components/DateRangeToolbar';

const Repos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllRepos = async () => {
      try {
        await dispatch(getUserRepos());
      } catch (error){
        console.error('Error fetching repos:',error);
      }
    }
    fetchAllRepos();
  },[dispatch])

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-gray-400 p-6 rounded-lg shadow-md w-96">
        <RepoList />
      </div>
    </div>
  );
}

export default Repos