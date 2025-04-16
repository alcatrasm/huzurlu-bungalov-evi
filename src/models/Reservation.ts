
export interface Reservation {
  id: string;
  user_id: string;
  bungalow_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: string;
  created_at: string | null;
  updated_at: string | null;
  bungalows?: {
    name: string;
  };
}
