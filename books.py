import pandas as pd
import requests

df = pd.read_csv('assets/books.csv')

# Convert 'Date Read' column to datetime, assuming 'Date Read' is the column name
df['Date Read'] = pd.to_datetime(df['Date Read'], errors='coerce')

# Filter rows where 'Date Read' is within 2023
df_2023 = df[df['Date Read'].dt.year == 2023]

# Sort the DataFrame by 'Date Read' in ascending order (earliest read first)
df_2023_sorted = df_2023.sort_values(by='Date Read')


def fetch_cover_url(isbn):
    # Replace with the correct API URL for fetching covers
    url = f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"
    response = requests.get(url)
    if response.status_code == 200:
        return url  # If the cover exists, return the URL
    else:
        return None


# Begin HTML for the webpage
html_output = ""

# Loop through each book and append HTML
for index, row in df_2023_sorted.iterrows():
    cover_url = fetch_cover_url(row['ISBN'][2:-1])
    if cover_url is None:
        cover_url = "/assets/nc-md.gif"  
    html_output += f"""
        <div class="card col-md-3">
            <img
            class="card-img-top"
            src="{cover_url}"
            alt="Cover image"
            />
            <div class="card-body">
            <h5 class="card-title fw-normal">
                {row['Title']} <br />by {row['Author']}
            </h5>
            <p>Read on: {row['Date Read'].strftime('%Y-%m-%d')}</p>
            </div>
        </div>
    """

    # <div class="book">
    #         <h2>{row['Title']}</h2>
    #         <h2>By {row['Author']}</h2>
    #         <p>Read on: {row['Date Read'].strftime('%Y-%m-%d')}</p>
    #         <img src="{cover_url}" alt="Cover image">
    #     </div>

# Close the HTML tags
# html_output += """
#     </div>
# </body>
# </html>
# """

# Write the HTML to a file
with open('books_2023.html', 'w') as file:
    file.write(html_output)
