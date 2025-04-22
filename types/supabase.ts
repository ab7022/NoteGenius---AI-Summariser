export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
          user_id: string
          summary: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          content: string
          user_id: string
          summary?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string
          user_id?: string
          summary?: string | null
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}