export function formatTime(value:string|Date|null|undefined){if(!value)return "—";return new Date(value).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});}
export function formatDate(value:string|Date|null|undefined){if(!value)return "—";const d=typeof value==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(value)?new Date(value+"T12:00:00"):new Date(value);return d.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric"});}
export function formatDateTime(value:string|Date|null|undefined){if(!value)return "—";return formatDate(value)+" · "+formatTime(value);}
