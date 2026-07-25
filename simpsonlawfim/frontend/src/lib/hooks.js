import { useState, useEffect, useMemo } from 'react';
import { fetchPracticeAreas, fetchPracticeArea, fetchTeamMembers, fetchTestimonials, fetchOffices, fetchPage } from './api';

import personalInjuryImg from '../data/personal injury.jpg';
import wrongfulDeathImg from '../data/life inssurence policy.jpg';
import vehicleAccidentsImg from '../data/vahical accedent case.jpg';
import criminalLawImg from '../data/criminal law.jpg';
import litigationImg from '../data/civil litigations.jpg';
import divorceCustodyImg from '../data/Divorce and Custody Cases.jpg';
import heroBg from '../data/Courtroom Set_Blog Title.webp';

const localImages = {
  'personal-injury': personalInjuryImg,
  'wrongful-death': wrongfulDeathImg,
  'vehicle-accidents': vehicleAccidentsImg,
  'criminal-law': criminalLawImg,
  'litigation': litigationImg,
  'divorce-custody': divorceCustodyImg,
};

function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchFn()
      .then((res) => { if (!cancelled) setData(res); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error };
}

export function usePracticeAreas() {
  const { data, loading, error } = useFetch(fetchPracticeAreas);

  const areas = useMemo(() => {
    return (data?.results || []).map((area) => {
      const img = localImages[area.slug] || (area.hero_image || heroBg);
      return { ...area, image: img };
    });
  }, [data]);

  return { practiceAreas: areas, loading, error };
}

export function usePracticeArea(slug) {
  const { data, loading, error } = useFetch(() => fetchPracticeArea(slug), [slug]);

  const area = useMemo(() => {
    if (!data) return null;
    const img = localImages[data.slug] || (data.hero_image || heroBg);
    return { ...data, image: img };
  }, [data]);

  return { area, loading, error };
}

export function useTeamMembers() {
  const { data, loading, error } = useFetch(fetchTeamMembers);
  const members = useMemo(() => data?.results || [], [data]);
  return { members, loading, error };
}

export function useTestimonials() {
  const { data, loading, error } = useFetch(fetchTestimonials);
  const testimonials = useMemo(() => data?.results || [], [data]);
  return { testimonials, loading, error };
}

export function useOffices() {
  const { data, loading, error } = useFetch(fetchOffices);
  const offices = useMemo(() => data?.results || [], [data]);
  return { offices, loading, error };
}

export function usePage(slug) {
  const { data, loading, error } = useFetch(() => fetchPage(slug), [slug]);
  return { page: data, loading, error };
}
