import { useQuery } from '@tanstack/react-query';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import api from '../../services/api';

interface LocationData {
  name: string;
  country: string;
  value: number;
  sessions: number;
  coordinates: [number, number];
}

interface GALocationResponse {
  locations: LocationData[];
  totalUsers: number;
  totalSessions: number;
  topCountry: string;
}

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

export const GeolocationMap = () => {
  const { data, isLoading } = useQuery<GALocationResponse>({
    queryKey: ['analytics', 'locations'],
    queryFn: async () => {
      const response = await api.get('/dashboard/analytics/locations');
      return response.data;
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
        <div className="flex items-center justify-center h-[500px]">
          <div className="text-white/60 text-sm uppercase tracking-widest">Loading map data...</div>
        </div>
      </div>
    );
  }

  if (!data || !data.locations || data.locations.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
        <div className="flex items-center justify-center h-[500px]">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-slate-600/50 mb-4">public</span>
            <p className="text-slate-400 font-light">No location data available</p>
          </div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.locations.map((loc) => loc.value));

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight mb-2">Visitor Locations</h3>
            <p className="text-xs text-slate-400 font-light">Global traffic distribution from Google Analytics</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-neon-mint tracking-tighter">
              {data.totalUsers.toLocaleString()}
            </div>
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mt-1">Total Users</div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neon-mint/30 border border-neon-mint/50"></div>
            <span className="text-slate-400">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-neon-mint/50 border border-neon-mint"></div>
            <span className="text-slate-400">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-neon-mint border border-neon-mint"></div>
            <span className="text-slate-400">High</span>
          </div>
        </div>
      </div>

      <div className="relative h-[500px] rounded-sm overflow-hidden border border-white/5 bg-slate-900/50">
        <ComposableMap
          projectionConfig={{
            scale: 150,
            center: [120, -2],
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1e293b"
                  stroke="rgba(255, 255, 255, 0.1)"
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#334155', outline: 'none' },
                    pressed: { fill: '#475569', outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {data.locations.map((location, index) => {
            const size = Math.max(8, Math.min(24, (location.value / maxValue) * 24));
            const opacity = Math.max(0.3, Math.min(1, location.value / maxValue));
            
            return (
              <Marker key={index} coordinates={location.coordinates}>
                <g>
                  <circle
                    r={size}
                    fill="#00ffcc"
                    fillOpacity={opacity}
                    stroke="#00ffcc"
                    strokeWidth={2}
                    strokeOpacity={0.8}
                    className="animate-pulse"
                  >
                    <title>
                      {location.name}, {location.country}
                      {'\n'}Users: {location.value.toLocaleString()}
                      {'\n'}Sessions: {location.sessions.toLocaleString()}
                    </title>
                  </circle>
                  <circle
                    r={size * 0.6}
                    fill="#00ffcc"
                    fillOpacity={0.6}
                    className="animate-ping"
                    style={{ animationDuration: '2s' }}
                  />
                </g>
              </Marker>
            );
          })}
        </ComposableMap>
      </div>

      {/* Top Locations List */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <h4 className="text-sm font-extrabold text-white mb-4 tracking-tight">Top Locations</h4>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {data.locations
            .sort((a, b) => b.value - a.value)
            .slice(0, 10)
            .map((location, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-sm hover:border-neon-mint/30 transition-all"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-lg font-extrabold text-slate-500 w-6">{index + 1}</div>
                  <div className="flex-1">
                    <div className="text-sm font-extrabold text-white tracking-tight">{location.name}</div>
                    <div className="text-xs text-slate-400 font-light">{location.country}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-neon-mint tracking-tighter">
                    {location.value.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 font-light">{location.sessions.toLocaleString()} sessions</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
