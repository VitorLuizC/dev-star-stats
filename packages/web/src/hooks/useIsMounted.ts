import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook that returns a function to check if component is mounted.
 */
const useIsMounted = () => {
  const isMountedRef = useRef(true);

  useEffect(() => () => {
    isMountedRef.current = false;
  }, [isMountedRef]);

  return useCallback(() => isMountedRef.current, [isMountedRef]);
};

export default useIsMounted;
